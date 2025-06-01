# JavaScript and TypeScript Snippets for VSCode

This repository contains a collection of simple JavaScript and TypeScript snippets for VSCode, created using the snipgen extension.

## Usage

To use these snippets, open a JavaScript or TypeScript file in VSCode and type the snippet name followed by a tab. The snippet will be inserted into the file at the cursor position.

## Snippets

```js
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

async // a async
async function $1($2) { $3 }; // af asf async function
export async function $1($2) { $3 }; // eaf expaf expasf export async function
```

```js
useState($1); // us useState
useEffect($1); //ue useEffect
useLayoutEffect($1); // ule useLayoutEffect
useRef($1); // ur useRef
uneNavigation($1); // rrun useNavigation
useSelector($1); // rus useSelector
useDispatch($1); // rud useDispatch

className = { $1 }; // cn className

// rfc
function $1($2) {
  return (
    <>
      <div>$1</div>
    </>
  );
}

//rcc
class $1 extends React.Component {
  constructor() {}
  render() {
    return (
      <>
        <div>$1</div>
      </>
    );
  }
}

//rafc
const $1 = () => {
  return (
    <>
      <div>$1</div>
    </>
  );
};

//rumafc
const $1 = useMemo(() => {
  return (
    <>
      <div>$1</div>
    </>
  );
}, []);
```

```js
useSwipe($1); // usw
useResize($1); // ur
useClickOutside($1); // uco

// hookUseSwipe
function useSwipe(ref = document, callback, deps = [], ignoreValue = 100) {
  let startX, endX, startY, endY;
  startX = endX = startY = endY = 0;

  function touchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }

  function touchEnd(e) {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    if (
      Math.abs(startX - endX) < ignoreValue ||
      Math.abs(startY - endY) > ignoreValue / 2
    ) {
      return;
    }
    if (startX - endX > 0) {
      callback(false);
    } else {
      callback(true);
    }
  }

  useEffect(() => {
    ref.addEventListener("touchstart", touchStart, false);
    ref.addEventListener("touchend", touchEnd, false);

    return () => {
      ref.removeEventListener("touchstart", touchStart, false);
      ref.removeEventListener("touchend", touchEnd, false);
    };
  }, deps);
}

// hookUseResize
function useResize(size) {
  const [state, setState] = useState(window.innerWidth <= config[size]);

  const handleResize = (size) => {
    const width = window.innerWidth;
    if (width <= size) {
      setState(true);
      return;
    }
    setState(false);
  };

  useEffect(() => {
    window.addEventListener("resize", () => handleResize(config[size]));
    return () => {
      window.removeEventListener("resize", () => handleResize(config[size]));
    };
  }, [size]);

  return state;
}

// hookUseClickOutside
function useClickOutside(ref, callback, deps) {
  useEffect(() => {
    const eventTypes = [
      "mousedown",
      "mouseup",
      "focusin",
      "focusout",
      "touchstart",
      "touchend"
    ];

    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    eventTypes.forEach((eventType) =>
      document.addEventListener(eventType, listener)
    );

    return () => {
      eventTypes.forEach((eventType) =>
        document.removeEventListener(eventType, listener)
      );
    };
  }, [ref, callback, ...deps]);
}
```
