import { qb } from "../../configs/db-config";

export function byZoneIdSelect(zone_id: number) {
  return qb
    .select("territory_id", "name", "in_service", "state", "county", "district")
    .where("territory_id", zone_id)
    .from("territory")
    .limit(1)
    .toString();
}

export function allZoneSelect() {
  return qb.select("*").from("area_blocks").toString();
}
export function allTerritorySelect() {
  return qb.select("*").from("territory").toString();
}
export function territoryByIdSelect(territory_id: string) {
  return qb
    .select("*")
    .from("territory")
    .where("territory_id", territory_id)
    .toString();
}
export function territoryByZipCodeSelect(zipcode: string) {
  return qb
    .select("*")
    .from("territory")
    .where("zipcode", zipcode)
    .toString();
}

export function createZone(payload: any) {
  return qb("area_blocks")
    .insert(payload.map((item) => item))
    .returning("block_id")
    .toString();
}
