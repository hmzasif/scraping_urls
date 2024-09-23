import axios from 'redaxios';
import FlashMessages from "controllers/vue_components/flash_messages"

export default {
    name: 'Scraper',
    props: [],
    data() {
        return {
            url: '',
            list_of_urls: [],
            is_loading: false // Add loading state
        };
    },
    components: {
        FlashMessages
    },
    methods: {
        async scrapeUrl() {
            if (!this.url) {
                this.$refs.flash.show("Please enter a URL to scrape the webpage", 'alert');
                return;
            }
            this.is_loading = true;

            let headers = {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').getAttribute('content')
            };

            try {
                const response = await axios.post('/scrape', { url: this.url }, { headers });

                if (response.data.success) {
                    this.list_of_urls = response.data.list;
                    this.$refs.flash.show("URLs extracted and stored in the table", 'notice');
                } else {
                    this.list_of_urls = [];
                    this.$refs.flash.show(response.data.error || "Server error. Please try again.", 'alert');
                }
            } catch (error) {
                this.$refs.flash.show("An error occurred. Please try again. ", 'alert');
            }
            this.is_loading = false;
        }
    },
    template: `
      <div class="mx-auto p-3">
        <FlashMessages ref="flash"></FlashMessages>
        <div class="relative max-w-xl mx-auto mb-4">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
        
          <input v-model="url" id="default-url" type="text" placeholder="Enter URL to scrape" @keyup.enter="scrapeUrl" 
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required 
          />
          
          <button @click="scrapeUrl" class="ease-in duration-300 absolute right-2.5 bottom-2.5 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Scrape
          </button>
    
        </div>
    
        <div v-if="is_loading" class="flex justify-center mt-8">
            <span class="relative flex h-5 w-5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
            </span>
        </div>
    
        <div v-if="list_of_urls.length && url" class="mt-6 mx-5 sticky top-0 z-10">
            <div class="rounded overflow-hidden border relative mx-auto">
                <table class="w-full text-sm text-left rounded-[5px] rtl:text-right text-gray-500">
                    <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-light">
                        Total fetched URLs are {{ list_of_urls.length }}
                        <p class="mt-1 text-sm font-normal text-gray-500">
                          URL: <a :href="url" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">
                             {{ url }}
                          </a>
                        </p>
                    </caption>
                    <thead class="text-xs w-full text-gray-700 border-b uppercase bg-gray-50">
                        <tr class="w-full">
                            <th scope="col" class="px-6 py-3  w-2/3">
                               URL
                            </th>
                            <th scope="col" class="px-6 py-3 w-1/3">
                                Anchor Text
                            </th>
                        </tr>
                    </thead>
                    <tbody class="w-full">
                        <tr v-for="(link, index) in list_of_urls" :key="index" class="w-full bg-white border-b">
                            <td class="px-6 py-4 word-break break-all  w-2/3 font-medium text-gray-900">
                                {{ link.url }}
                            </td>
                            <td class="px-6 py-4 whitespace-wrap w-1/3">
                                {{ link.anchor_text }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
`
};
