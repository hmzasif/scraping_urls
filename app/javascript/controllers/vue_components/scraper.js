import axios from 'redaxios';
import FlashMessages from "controllers/vue_components/flash_messages"

export default {
    name: 'Scraper',
    props: [],
    data() {
        return {
            url: '',
            list_of_urls: [],
            is_loading: false
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
        <div class="container pt-24 mx-auto flex justify-center items-center">
            <div class="flex flex-col w-full xl:w-3/5 justify-center lg:items-start overflow-y-hidden">
              <h1 class="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                      URLs Scraping Web App
                </span>
              </h1>
              <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left text-gray-300">
                Please enter the URL of the webpage you want to scrape. The app will return all the URLs found on the page below.
              </p>
        
              <div class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                  <label class="text-left block text-gray-300 py-2 font-bold mb-2" for="emailaddress">
                    Enter URL to scrape
                  </label>
                  <input
                    v-model="url" id="default-url"
                    @keyup.enter="scrapeUrl"
                    class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    type="text"
                    placeholder="https://example.com"
                  />
                </div>
        
                <div class="flex items-center justify-between pt-4">
                  <button
                    @click="scrapeUrl"
                    class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    type="button"
                  >
                    Scrape
                  </button>
                </div>
              </div>
            </div>
        </div>
        
        <div v-if="is_loading" class="flex justify-center mt-8">
            <span class="relative flex h-5 w-5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
            </span>
        </div>
        
        <div v-if="list_of_urls.length && url" class="mt-6 mx-5 md:mx-14 sticky top-0 z-10">
            <div class="rounded-lg overflow-hidden border border-gray-500 relative mx-auto">
                <table class="w-full text-sm text-left rounded-[5px] rtl:text-right text-gray-300">
                    <caption class="p-5 text-lg font-semibold text-left text-gray-300 bg-gray-900 opacity-75">
                        Total fetched URLs are {{ list_of_urls.length }}
                        <p class="mt-1 text-sm font-normal text-gray-300">
                          URL: <a :href="url" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">
                             {{ url }}
                          </a>
                        </p>
                    </caption>
                    <thead class="text-xs w-full border-b border-t border-gray-500 uppercase bg-gray-900 opacity-90">
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
                        <tr v-for="(link, index) in list_of_urls" :key="index" class="w-full bg-gray-900 opacity-75 border-b border-gray-500">
                            <td class="px-6 py-4 word-break break-all  w-2/3 font-medium">
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
`
};
