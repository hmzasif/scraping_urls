import axios from 'redaxios';
import FlashMessages from "controllers/vue_components/flash_messages"

export default {
    name: 'Scraper',
    props: [],
    data() {
        return {
            url: '',
            list_of_urls: []
        };
    },
    components: {
        FlashMessages
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
                if(this.urls_list == [] || this.urls_list.length == 0){
                    this.$refs.flash.show("No URL found on this page", 'alert');
                } else {
                    this.$refs.flash.show("URLs Fetched", 'notice');
                }
            } else {
                this.$refs.flash.show("something went wrong", 'alert');
            }
        }
    },
    computed: {},
    template: `
        <FlashMessages ref="flash"></FlashMessages>
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
