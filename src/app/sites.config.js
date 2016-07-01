let sites = [
  {
    site : 'blink',
    display: 'Blink',
    burl : 'http://www.blink.com.kw',
    order: 20,
    active: true,
    search: true,
    deals: true,
    color: '#fff203'
  },
  {
    site: 'ksouq',
    display: 'Souq',
    burl: 'http://kuwait.souq.com',
    order: 40,
    active: true,
    search: true,
    deals: false,
    color: '#006fcc'
  },
  {
    site: 'mrbabu',
    display: 'MrBabu',
    burl: 'http://www.mrbabu.com',
    order: 30,
    active: true,
    search: true,
    deals:false,
    color: '#22798f'
  },
  {
    site: 'ubuy',
    display: 'Ubuy',
    burl: 'https://www.ubuy.com.kw',
    order: 50,
    active: true,
    search: true,
    deals:false,
    color: '#F9B223'
  },
  {
    site: 'xcite',
    display:'Xcite',
    burl: 'http://www.xcite.com',
    order: 10,
    active: true,
    search: true,
    deals: true,
    color: '#75d0f7'
  },
  {
    site: 'taw9eel',
    display: 'Taw9eel',
    burl: 'http://www.taw9eel.com',
    order: 60,
    active: true,
    search: true,
    deals: false,
    color: '#E85F09'
  },
  {
    site: 'cavaraty',
    display: 'Cavaraty',
    burl: 'http://www.cavaraty.com',
    order: 80,
    active: true,
    search: true,
    deals: false,
    color: '#CCCCCC'
  },
  {
    site: 'gamesq8',
    display: 'GamesQ8',
    burl: 'http://gamesq8.com',
    order: 80,
    active: true,
    search: true,
    deals: false,
    color: '#f47b01'
  },
  {
    site: 'beidounonline',
    display: 'Beidounonline',
    burl: 'http://www.beidounonline.com',
    order: 90,
    active: true,
    search: true,
    deals: false,
    color: '#222222'
  },
  {
    site: 'dealskw',
    display: 'Deals',
    burl: 'http://www.deals.com.kw',
    order: 90,
    active: true,
    search: true,
    deals: true,
    color: '#fe57a1'
  },
  {
    site: 'bestkw',
    display: 'Best',
    burl: 'http://www.best.com.kw',
    order: 100,
    active: true,
    search: true,
    deals: false,
    color: '#E32A2A'
  },
  {
    site: 'sheeel',
    display: 'Sheeel',
    burl: 'http://www.sheeel.com/',
    order: 120,
    active: true,
    search: false,
    deals: true,
    color: '#a7417e'
  }

  // quick.com.kw
  // beraven.com
];

let cache_req = true ; 

//export var deals = {} ;
//var xcite_data = null,
//    xcite_ctime = null ;

export var xSites = sites.filter(x=>x.active)
						 .sort((a,b)=>(a.order-b.order));
export var xCurrency = 'KD';

export var xGetDeals = {
  
  xcite: (http, prds)=>{

    let s = sites.find(x=>(x.site=='xcite')) ;

    let scrap = (x,prds)=>{
      let items = $(x.body.children).find('.product-item');
      for (let i = 0; i < items.length; i++) {
        try {
          let prd = {
              site: s.site,
              product: $(items[i]).find('.product-image').attr('title'),
              href: $(items[i]).find('.product-image').attr('href').split(/[?#]/)[0],
              image_tn: $(items[i]).find('.product-image').find('img').data('src'),
              price: Number($(items[i]).find(' .finalprice').html().split(/ /)[0]),
              stock: $(items[i]).find(' .out-of-stock').html() === null ? 1 : 0,
          };
          prds.push(prd);
        } catch (e) {
            console.log(i + $(items[i]).find('.product-image').attr('title') + e);
        }  
      }
    };

    http.get( s.burl + '/dailydeal/index/list/', {cache: cache_req}).
      then( r => {
        let xcite_data = document.implementation.createHTMLDocument('xDeals_xcite');
        xcite_data.body.innerHTML = r.data;
        scrap(xcite_data, prds);
    
      });


  },

  blink: (http, prds)=>{

    let s = sites.find(x=>(x.site=='blink')) ;

    let scrap = (x, prds)=>{
      let items = $(x.body.children).find('.dealcenterContainer');
      //let prds = [];
      for (let i = 0; i < items.length; i++) {
        try {
          let prd = {
              site: s.site,
              product: $(items[i]).find('.dodProducttitle').find('a').text().trim(),
              href: s.burl + $(items[i]).children('a').attr('href').split(/[?#]/)[0],
              image_tn: s.burl + $(items[i]).children('a').children('img').attr('src'),
              price: Number($(items[i]).find(' .price').html().split(/ /)[0]),
              stock: $(items[i]).find(' .outStock').html() === null ? 1 : 0,
          };
          prds.push(prd);
        } catch (e) {
          console.log(i + $(items[i]).find('.dodProducttitle').find('a').text().trim() + e);
        }
      }
    };

    http.get(s.burl + '/deals', {cache: cache_req}).
      then( r => {
        let blink_data = document.implementation.createHTMLDocument('xDeals_blink');
        blink_data.body.innerHTML = r.data;
        scrap(blink_data, prds);        

      });

  },  

  dealskw: (http, prds)=>{

    let s = sites.find(x=>(x.site=='dealskw')) ;

    let scrap = (x, prds)=>{
      try {
        let prd = {
            site: s.site,
            product: $(x.body.children).find('.fullWhiteWidget .productDescription h3').text().trim(),
            href: s.burl,
            image_tn: s.burl + '/' + $(x.body.children).find('.fullWhiteWidget #zoom1 img').attr('src'),
            price: Number($(x.body.children).find('.fullWhiteWidget .cost').text().trim()),
            stock: 1,
        };
        prds.push(prd);
      } catch (e) {
        console.log(i + $(x.body.children).find('.fullWhiteWidget .productDescription h3').text().trim() + e);
      }

    };

    http.get(s.burl, {cache: cache_req}).
      then( r => {
        let d = document.implementation.createHTMLDocument('xDeals_dealskw');
        d.body.innerHTML = r.data;
        scrap(d, prds);        

      });
  },  

  sheeel: (http, prds)=>{
    let s = sites.find(x=>(x.site=='sheeel')) ;

    let scrap = (x, prds)=>{
      try {
        let prd = {
            site: s.site,
            product: $(x.body.children).find('.product-view .product-name').text().trim(),
            href: s.burl,
            image_tn: $(x.body.children).find('.product-view .product-img-box img').first().attr('src'),
            price: Number($(x.body.children).find('.product-view .price').first().text().replace(/KD/i, '')),
            stock: 1,
        };
        prds.push(prd);
      } catch (e) {
        console.log(i + $(x.body.children).find('.product-view .product-name').text().trim() + e);
      }

    };

    http.get(s.burl, {cache: cache_req}).
      then( r => {
        let d = document.implementation.createHTMLDocument('xDeals_sheeel');
        d.body.innerHTML = r.data;
        scrap(d, prds);        

      });
  },

}

