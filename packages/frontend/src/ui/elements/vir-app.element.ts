import {backendPort, sharedStuff} from '@electrovir/shared';
import {defineElementNoInputs, html} from 'element-vir';

export const VirApp = defineElementNoInputs({
    tagName: 'vir-app',
    initCallback: () => {
        async function pingBackend() {
            const result = await (await fetch(`http://localhost:${backendPort}/stuff`)).json();
            console.log({result});
        }

        setInterval(pingBackend, 5_000);
        pingBackend();
    },
    renderCallback: () => {
        const entries = Object.entries(sharedStuff);
        return html`
            <table>
                ${entries.map((entry) => {
                    return html`
                        <tr>
                            <td>${entry[0]}</td>
                            <td>${entry[1]}</td>
                        </tr>
                    `;
                })}
            </table>
        `;
    },
});
