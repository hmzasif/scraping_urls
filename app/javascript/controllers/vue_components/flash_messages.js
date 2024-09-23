export default {
  name: 'FlashMessages',
  props: [],
  data() {
    return {
      flash_type: '',
      message: '',
      show_message: true
    };
  },
  methods: {
    show(message, type) {
      this.flash_type = type;
      this.message = message;
      this.show_message = true;
      setTimeout(() => {
        this.flash_type = '';
        this.show_message = false;
        this.message = '';
      }, 3000);
    },
  },
  template: `
  <div v-if="show_message" 
       class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ease-in-out"
       :class="{'opacity-100': show_message, 'opacity-0': !show_message}">
    <div :class="{
        'border border-red-500 text-red-600 bg-transparent': flash_type === 'alert',
        'border border-green-500 text-green-600 bg-transparent': flash_type === 'notice',
        'flex items-center p-2 mb-4 rounded-lg': true
      }" role="alert">
      
      <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path v-if="flash_type === 'alert'" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        <path v-if="flash_type === 'notice'" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      
      <div class="ms-3 text-sm font-medium">{{ message }}</div>
      
    </div>
  </div>
`,
};
