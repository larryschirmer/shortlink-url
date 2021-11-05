const makeAccessor = <KeyName extends string, ReturnType>(key: string) => (
  dataPoint: { [index in KeyName]: ReturnType } & { [index: string]: any }
): ReturnType => dataPoint[key];

export default makeAccessor;
