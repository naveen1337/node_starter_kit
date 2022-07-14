export function stripObjKeys(payload: any, keys: Array<string>) {
  for (const item of keys) {
    delete payload[item];
  }
  return payload;
}

