import fetch from "node-fetch";

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return 'this is cyclic';
      }
      seen.add(value);
    } else if (typeof value === 'function') {
			return 'this is a function'
		}
    return value;
  };
}

const sendDebug = function (body) {
	return fetch("http://localhost:3000/send", {
		method: "post",
		body: JSON.stringify(body, getCircularReplacer()),
		headers: { "Content-Type": "application/json" },
	});
};

const wlog = function (...args) {
	for (const a of args) {
		sendDebug(a)
	}
};

export {
	wlog,
}
