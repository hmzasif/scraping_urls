import axios from 'redaxios';

export default {
    name: 'Scraper',
    props: [],
    data() {
        return {
            url: '',
            list_of_urls: []
        };
    },
    methods: {
        async scrapeUrl() {
            let headers =  {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').getAttribute('content')
            }

            const response = await axios.post('/scrape', {url: this.url}, {headers});

            if (response.data.success) {
                this.list_of_urls = response.data.list;
            } else {
                alert(response.data.message || 'Something went wrong');
            }
        }
    },
    computed: {},
    template: `
        <div>
            <input 
                v-model="url" 
                placeholder="Enter URL to scrape" 
                @keyup.enter="scrapeUrl" 
            />
            <button @click="scrapeUrl">Scrape</button>
            <div v-if="list_of_urls.length && url">
                <p>Total Urls: {{ list_of_urls.length }}</p>
                <table v-if="list_of_urls.length > 0">
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Anchor Text</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(link, index) in list_of_urls" :key="index">
                            <td>{{ link.url }}</td>
                            <td>{{ link.anchor_text }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};
