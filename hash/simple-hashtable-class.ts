class SimpleHashTable {
  public arr: any[];

  constructor(size: number = 27) {
    this.arr = new Array(size);
  }

  private hash(key: string) {
    let total = 0;

    const PRIME_NUM = 31;

    for (let i = 0; i < Math.min(key.length, 20); i++) {
      // add char utf code - 96 so we can gen the
      // number of its alphabetical order, a = 1, b = 2, and so on
      const value = key[i].charCodeAt(0) - 96;
      // add mod so it is not overflowing the len
      total = (total * PRIME_NUM + value) % this.arr.length;
    }

    return total;
  }

  set(key: string, value: any) {
    // get hashed index
    const hashed = this.hash(key);

    // if the array does not have any value inside
    if (!this.arr[hashed]) {
      // set to empty array
      this.arr[hashed] = [];
    }

    // overwrite data if the provided key is the same
    for (let i = 0; i < this.arr[hashed].length; i++) {
      if (this.arr[hashed][i][0] === key) {
        this.arr[hashed][i] = [key, value];
        return this.arr[hashed][i];
      }
    }

    // place the value inside array based on hashed value
    this.arr[hashed].push([key, value]);
    return this.arr[hashed];
  }

  get(key: string) {
    // get hashed value
    const hashed = this.hash(key);

    if (!this.arr[hashed]) return null;
    if (this.arr[hashed].length === 1) {
      return this.arr[hashed][0][1];
    }

    for (let i = 0; i < this.arr[hashed].length; i++) {
      if (this.arr[hashed][i][0] === key) {
        return this.arr[hashed][i][1];
      }
    }

    return null;
  }
}

const hashClass = new SimpleHashTable();

hashClass.set("uuid", "123e4567-e89b-12d3-a456-426614174000");
hashClass.set("username", "resqiar");
hashClass.set("password", "whocaresaboutpassword");

hashClass.set("description", "before-changed");
hashClass.set("description", "after-changed");

hashClass.set("like", 20000);
hashClass.set("followers", 2391239);

hashClass.set("collection", ["a", "b", "c"]);

console.log(hashClass.get("uuid"));
console.log(hashClass.get("username"));
console.log(hashClass.get("password"));
console.log(hashClass.get("description"));
console.log(hashClass.get("followers"));
console.log(hashClass.get("collection"));
console.log(hashClass.get("nothing"));
