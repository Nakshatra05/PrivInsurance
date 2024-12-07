import { RtcPairSocket } from "rtc-pair-socket";
import AsyncQueue from "./AsyncQueue";
import assert from "./assert";
import generateProtocol from "./generateProtocol";

/*
interface InsurancePolicyProfile {
  id: number;
  age: {
    min: number;
    max: number;
  };
  height: {
    min: number;
    max: number;
  };
  weight: {
    min: number;
    max: number;
  };
  // gender: "male" | "female" | "other";
  gender: [string];
  bloodGroup: [string];
  // bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  // medicalConditions: [string];
}

interface PersonHealthProfile {
  age: number;
  height: number;
  weight: number;
  gender: "male" | "female" | "other";
  bloodGroup: string;
  // medicalConditions: [string];
  // bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  // exercise: {
  //   frequency: "daily" | "weekly" | "monthly" | "rarely";
  //   duration: number; // in minutes
  // };
}
*/

export default class App {
  socket?: RtcPairSocket;
  party?: "alice" | "bob";
  // peer?: "customer" | "provider";

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
    const socket = new RtcPairSocket(code, party);
    this.socket = socket;

    socket.on("message", (msg: unknown) => {
      // Using a message queue instead of passing messages directly to the MPC
      // protocol ensures that we don't miss anything sent before we begin.
      this.msgQueue.push(msg);
    });

    await new Promise<void>((resolve, reject) => {
      socket.on("open", resolve);
      socket.on("error", reject);
    });
  }

  async find_insurar_caller(): Promise<number> {
    // let user_health_profile: PersonHealthProfile = {
    //   age: 25,
    //   height: 180,
    //   weight: 70,
    //   bloodGroup: "B+",
    //   gender: "male",
    // };


    let user_health_profile = {
      age: 25,
      height: 180,
      weight: 70,
    };

    console.log("finding insurar for user_health_profile", user_health_profile);

    return await this.find_insurar(user_health_profile);
  }

  async find_insurar(values: { age: number, height: number, weight: number }): Promise<number> {
    const { party , socket } = this;

    assert(party !== undefined, "Party must be set");
    assert(socket !== undefined, "Socket must be set");

    // const input = party === "customer" ? { a: value } : { b: value };
    const input = values;
    // const otherParty = party === "alice" ? "customer" : "provider";
    const otherParty = party === 'alice' ? 'bob' : 'alice';

    const protocol = await generateProtocol();

    const session = protocol.join(party, input, (to, msg) => {
      assert(to === otherParty, "Unexpected party");
      socket.send(msg);
    });

    this.msgQueue.stream((msg: unknown) => {
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
    let insurance_profiles= 
      {
        // id: 1,
        min_age: 20, max_age: 30 ,
        min_height: 170, max_height: 180 ,
        min_weight: 60, max_weight: 80 ,
        // bloodGroup: ["B+"],
        // gender: ["female"],
      }
    ;

    console.log("feedign insurance_profiles", insurance_profiles);

    return await this.feed_to_client(insurance_profiles);
  }

  // "min_age", "max_age", "min_height", "max_height", "min_weight", "max_weight"
  async feed_to_client(values: { min_age: number, max_age: number, min_height: number, max_height: number, min_weight: number, max_weight: number }): Promise<number> {
    const { party, socket } = this;

    assert(party !== undefined, "Party must be set");
    assert(socket !== undefined, "Socket must be set");

    const input = values;
    // const otherParty = party === "customer" ? "customer" : "privider";
    const otherParty = party === 'alice' ? 'bob' : 'alice';

    const protocol = await generateProtocol();

    const session = protocol.join(party, input, (to, msg) => {
      assert(to === otherParty, "Unexpected party");
      socket.send(msg);
    });

    this.msgQueue.stream((msg: unknown) => {
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

  async mpcLargest(value: number): Promise<number> {
    const { party, socket } = this;

    assert(party !== undefined, "Party must be set");
    assert(socket !== undefined, "Socket must be set");

    const input = party === "alice" ? { a: value } : { b: value };
    const otherParty = party === "alice" ? "bob" : "alice";

    const protocol = await generateProtocol();

    const session = protocol.join(party, input, (to, msg) => {
      assert(to === otherParty, "Unexpected party");
      socket.send(msg);
    });

    this.msgQueue.stream((msg: unknown) => {
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
