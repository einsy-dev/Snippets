useSwipe($1) // usw
useResize($1) // ur
useClickOutside($1) // uco

// hookUseSwipe
function useSwipe(
	ref = document,
	callback,
	deps = [],
	ignoreValue = 100
) {
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
		ref.addEventListener('touchstart', touchStart, false);
		ref.addEventListener('touchend', touchEnd, false);

		return () => {
			ref.removeEventListener('touchstart', touchStart, false);
			ref.removeEventListener('touchend', touchEnd, false);
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
		window.addEventListener('resize', () => handleResize(config[size]));
		return () => {
			window.removeEventListener('resize', () => handleResize(config[size]));
		};
	}, [size]);

	return state;
}

// hookUseClickOutside
function useClickOutside(ref, callback, deps) {
	useEffect(() => {
		const eventTypes = [
			'mousedown',
			'mouseup',
			'focusin',
			'focusout',
			'touchstart',
			'touchend'
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