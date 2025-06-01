console.log // clg
console.log($1); // clg()
console.error // clge
console.error($1); // clge()
console.warn // clgw
console.warn($1); // clgw()
console.info // clgi
console.info($1); // clgi()

const $1 = $2; // c const
let $1;  // l let
async // a async

import { $1 } from "$2"; // i imp import
import $1 from "$2"; // id impd import default
import * as $1 from "$2"; // ia impa import all

export $1; // e exp export
export default $1; // ed expd export default
export { $1 } from "$2"; // ef expf export from
export $1 from "$2"; // edf expdf export default from
export { $1 as default } from "$2"; // eadf expadf
export * from "$1"; // eaf expaf export * from
export * as $1 from "$2"; // eaaf expaaf

($1) => { $2 }; // af arrf () => {
export const $1 = ($2) => { $3 }; // ecaf expaf export const

function $1($2) { $3 }; // f func function
export function $1($2) { $3 }; // ef expf export function

async function $1($2) { $3 }; // af asf async function
export async function $1($2) { $3 }; // eaf expaf expasf export async function
