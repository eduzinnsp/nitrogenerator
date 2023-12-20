import axios from 'axios';
import fs from 'node:fs';
import HttpProxyAgent from 'http-proxy-agent';

export class Generator {
    constructor (qntd) {
        this.reqs = Array.from({ length: Number(qntd) });
    }

    async _x1020() {
        let urls = await Promise.all(
            this.reqs.map(async () => {
                try {
                    const request = await axios.post({
                        url: "https://api.discord.gx.games/v1/direct-fulfillment",
                        maxBodyLength: Infinity,
                        headers: { 'Content-Type': 'application/json' },
                        data: { "partnerUserId": await this._x2394() }
                    })
    
                    if (request.data !== '') {
                        return `https://discord.com/billing/partner-promotions/1180231712274387115/${request.data.token}`
                    }
                } catch (e) {
                    console.log(e)
                    return null;
                }
            })
        , this.reqs);
        fs.writeFileSync(`${process.cwd()}/src/stock/urls.txt`, urls.join("\n"));
        
        return urls;
    }

    async _x2394() {
        const uuid = `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
            const randomValue = Math.random() * 16 | 0;
            const value = (c === 'x') ? randomValue : (randomValue & 0x3 | 0x8);
            return value.toString(16);
        });
    
        return uuid;
    }
};