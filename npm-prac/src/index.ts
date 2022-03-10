import String from './utils/string';

import "/src/index.css";

export const _ = String;

///
const root = document.getElementById('root');
root.innerHTML = `<div>Hello World [${_.toDateString(new Date(),'yyyy:mm:dd hh24:mi:ss')}]</div>`;
