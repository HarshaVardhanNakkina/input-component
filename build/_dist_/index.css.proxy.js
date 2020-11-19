// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body {\r\n\tfont-family: 'Noto Sans JP', sans-serif;\r\n\tmargin: 0;\r\n\tposition: relative;\r\n}\r\n\r\n* {\r\n\tbox-sizing: border-box;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}