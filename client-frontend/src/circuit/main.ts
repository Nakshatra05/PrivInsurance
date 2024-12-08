// This obviously doesn't need to be a separate file, but it's here to
// demonstrate that you can split up your summon code like this.
// import find_matching_insurer from './insurance.ts';

export default function main(
  // a: PersonHealthProfile,
  // b: [InsurancePolicyProfile],

  // for user
  age: number,
  height: number,
  weight: number,
  // insurance profiles
  min_age: number,
  max_age: number,
  min_height: number,
  max_height: number,
  min_weight: number,
  max_weight: number,
): boolean {
  // let matched_insurers: number[] = [];

  // for (let i = 0; i < b.length; i++) {
  //   if (find_matching_insurer(a, b[i])) {
  //     matched_insurers.push(b[i].id);
  //   }
  // }

  if (age < min_age || age > max_age) {
    return false;
  } else if (height < min_height || height > max_height) {
    return false;
  } else if (weight < min_weight || weight > max_weight) {
    return false;
    // } else if (!b.bloodGroup.includes(a.bloodGroup)) {
    //   return false;
    // } else if (!b.gender.includes(a.gender)) {
    //   return false;
  } else {
    return true;
  }

  // return matched_insurers;
}

// function find_matching_insurer(
//   a: PersonHealthProfile,
//   b: InsurancePolicyProfile,
// ): boolean {
//   if (a.age < b.age.min || a.age > b.age.max) {
//     return false;
//   } else if (a.height < b.height.min || a.height > b.height.max) {
//     return false;
//   } else if (a.weight < b.weight.min || a.weight > b.weight.max) {
//     return false;
//   } else if (!b.bloodGroup.includes(a.bloodGroup)) {
//     return false;
//   } else if (!b.gender.includes(a.gender)) {
//     return false;
//   } else {
//     return true;
//   }
// }

// interface InsurancePolicyProfile {
//   id: number;
//   age: {
//     min: number;
//     max: number;
//   };
//   height: {
//     min: number;
//     max: number;
//   };
//   weight: {
//     min: number;
//     max: number;
//   };
//   gender: [string];
//   bloodGroup: [string];
// }

// interface PersonHealthProfile {
//   age: number;
//   height: number;
//   weight: number;
//   gender: string;
//   bloodGroup: string;
// }
