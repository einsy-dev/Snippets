useState($1) // us useState
useEffect($1) //ue useEffect
useLayoutEffect($1) // ule useLayoutEffect
useRef($1) // ur useRef
uneNavigation($1) // rrun useNavigation
useSelector($1) // rus useSelector
useDispatch($1) // rud useDispatch

// className={$1} // cn className

// rfc
function $1($2) {
	return (
		<>
			<div>$1</div>
		</>
	)
}

//rcc
class $1 extends React.Component {
	constructor() { }
	render() {
		return (
			<>
				<div>$1</div>
			</>
		)
	}
}

//rafc
const $1 = () => {
	return (
		<>
			<div>$1</div>
		</>
	)
}

//rumafc
const $1 = useMemo(() => {
	return (
		<>
			<div>$1</div>
		</>
	)
}, []);