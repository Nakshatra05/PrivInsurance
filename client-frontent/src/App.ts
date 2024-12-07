import { io, Socket } from "socket.io-client";
import AsyncQueue from "./AsyncQueue";
import assert from "./assert";
import generateProtocol from "./generateProtocol";

// Define your interface for the health profile
// interface PersonHealthProfile {
//   age: number;
//   height: number;
//   weight: number;
//   gender: "male" | "female" | "other";
//   bloodGroup: string;
// }

export default class App {
  socket?: Socket; // Replace RtcPairSocket with Socket from socket.io
  party?: "alice" | "bob";

  msgQueue = new AsyncQueue<unknown>();

  generateJoiningCode() {
    // 128 bits of entropy
    return [
      Math.random().toString(36).substring(2, 12),
      Math.random().toString(36).substring(2, 12),
      Math.random().toString(36).substring(2, 7),
    ].join("");
  }

  async connect(code: string, party: "alice" | "bob") {
    this.party = party;
    const socket = io("http://localhost:3000", { query: { party } });
    this.socket = socket;

    socket.on("message", (msg: unknown) => {
      // Using a message queue instead of passing messages directly ensures no message is missed
      this.msgQueue.push(msg);
    });

    // Emit a joining message to the server
    socket.emit("join", { code, party });

    // Wait for the connection to be established
    await new Promise<void>((resolve, reject) => {
      socket.on("connect", resolve);
      socket.on("error", reject);
    });
  }

  async listen_for_user() {
    let socket = this.socket;
    socket?.once("user", () => {
      console.log("new user connected");

      let insurance_profiles = {
        min_age: 20,
        max_age: 30,
        min_height: 170,
        max_height: 180,
        min_weight: 60,
        max_weight: 80,
      };

      this.feed_to_client(insurance_profiles);
    });
  }

  async find_insurar_caller(): Promise<number> {
    let user_health_profile = {
      age: 25,
      height: 180,
      weight: 70,
    };

    console.log("finding insurar for user_health_profile", user_health_profile);

    return await this.find_insurar(user_health_profile);
  }

  async find_insurar(values: {
    age: number;
    height: number;
    weight: number;
  }): Promise<number> {
    const { party, socket } = this;

    assert(party !== undefined, "Party must be set");
    assert(socket !== undefined, "Socket must be set");

    const input = values;
    const otherParty = party === "alice" ? "bob" : "alice";

    const protocol = await generateProtocol();

    const session = protocol.join(party, input, (to, msg) => {
      assert(to === otherParty, "Unexpected party");

      socket?.emit("message", msg); // Use socket.emit to send the message
    });

    this.msgQueue.stream((msg: any) => {
      console.log("msg: ", msg);
      // const uint8Array = new Uint8Array(msg);
      msg = new Uint8Array(msg);
      console.log("msg: ", msg);

      if (!(msg instanceof Uint8Array)) {
        throw new Error("Unexpected message type");
      }

      session.handleMessage(otherParty, msg);
    });

    const output = await session.output();
    console.log("output: ", output);

    if (
      output === null ||
      typeof output !== "object" ||
      typeof output.main !== "number"
    ) {
      throw new Error("Unexpected output");
    }

    return output.main;
  }

  async feed_to_client_caller(): Promise<number> {
    let insurance_profiles = {
      min_age: 20,
      max_age: 30,
      min_height: 170,
      max_height: 180,
      min_weight: 60,
      max_weight: 80,
    };
    console.log("feeding insurance_profiles", insurance_profiles);

    return await this.feed_to_client(insurance_profiles);
  }

  async feed_to_client(values: {
    min_age: number;
    max_age: number;
    min_height: number;
    max_height: number;
    min_weight: number;
    max_weight: number;
  }): Promise<number> {
    const { party, socket } = this;

    assert(party !== undefined, "Party must be set");
    assert(socket !== undefined, "Socket must be set");

    const input = values;
    const otherParty = party === "alice" ? "bob" : "alice";

    const protocol = await generateProtocol();

    const session = protocol.join(party, input, (to, msg) => {
      assert(to === otherParty, "Unexpected party");
      socket?.emit("message", msg); // Use socket.emit to send the message
    });

    this.msgQueue.stream((msg: any) => {
      msg = new Uint8Array(msg);
      console.log("msg: ", msg);
      if (!(msg instanceof Uint8Array)) {
        throw new Error("Unexpected message type");
      }

      session.handleMessage(otherParty, msg);
    });

    const output = await session.output();

    if (
      output === null ||
      typeof output !== "object" ||
      typeof output.main !== "number"
    ) {
      throw new Error("Unexpected output");
    }

    return output.main;
  }
}
