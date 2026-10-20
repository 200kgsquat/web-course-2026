import React from 'react';
export default function Stats({completed, remaining}) {return <p aria-live="polite">Осталось: {remaining}, Выполнено: {completed}</p>;}
