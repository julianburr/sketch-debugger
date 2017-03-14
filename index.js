export default {
  log(...args) {
    args.forEach(arg => {
      log(arg);
    });
  }
}

export const someThingElse = 'Hello World';