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
    search: false,
    deals: false,
    color: '#006fcc'
  },
  {
    site: 'mrbabu',
    display: 'MrBabu',
    burl: 'http://www.mrbabu.com',
    order: 30,
    active: true,
    search: false,
    deals:false,
    color: '#22798f'
  },
  {
    site: 'ubuy',
    display: 'Ubuy',
    burl: 'https://www.ubuy.com.kw',
    order: 50,
    active: true,
    search: false,
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
    search: false,
    deals: false,
    color: '#E85F09'
  },
  {
    site: 'cavaraty',
    display: 'Cavaraty',
    burl: 'http://www.cavaraty.com',
    order: 80,
    active: true,
    search: false,
    deals: false,
    color: '#CCCCCC'
  },
  {
    site: 'gamesq8',
    display: 'GamesQ8',
    burl: 'http://gamesq8.com',
    order: 80,
    active: true,
    search: false,
    deals: false,
    color: '#f47b01'
  },
  {
    site: 'beidounonline',
    display: 'Beidounonline',
    burl: 'http://www.beidounonline.com',
    order: 90,
    active: true,
    search: false,
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
    search: false,
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

let setMinMax = function(slider, prd){
  
  if(slider.min == null || slider.min == 0){
    slider.min = prd.price ; 
    slider.options.floor = prd.price ;
  } else if (prd.price < slider.min){
    slider.min = prd.price ;
    slider.options.floor = prd.price ;
  }  

  if(slider.max == null){
    slider.max = prd.price ; 
    slider.options.ceil = prd.price ; 
  } else if (prd.price > slider.max){
    slider.max = prd.price ;
    slider.options.ceil = prd.price ;
  }
}; 

let scrap_xcite = function(x,s,prds,slider){
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
          show: true
      };
      prds.push(prd);
      setMinMax(slider,prd);
      
    } catch (e) {
        console.log(i + $(items[i]).find('.product-image').attr('title') + e);
    }  
  }
};

export var xSites = sites.filter(x=>x.active)
						 .sort((a,b)=>(a.order-b.order));
export var xCurrency = 'KD';
export var xDecimals = 3;

export var xGetDeals = {
  
  xcite: (http, prds, slider)=>{

    let s = sites.find(x=>(x.site=='xcite')) ;

    http.get( s.burl + '/dailydeal/index/list/', {cache: cache_req}).
      then( r => {
        let d = document.implementation.createHTMLDocument('xDeals'+s.site);
        d.body.innerHTML = r.data;
        scrap_xcite(d,s,prds,slider);
    
      });


  },

  blink: (http, prds, slider)=>{

    let s = sites.find(x=>(x.site=='blink')) ;

    let scrap = (x)=>{
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
              show: true
          };
          prds.push(prd);
          setMinMax(slider,prd);
        } catch (e) {
          console.log(i + $(items[i]).find('.dodProducttitle').find('a').text().trim() + e);
        }
      }
    };

    http.get(s.burl + '/deals', {cache: cache_req}).
      then( r => {
        let blink_data = document.implementation.createHTMLDocument('xDeals_blink');
        blink_data.body.innerHTML = r.data;
        scrap(blink_data);        

      });

  },  

  dealskw: (http, prds, slider)=>{

    let s = sites.find(x=>(x.site=='dealskw')) ;

    let scrap = (x)=>{
      try {
        let prd = {
            site: s.site,
            product: $(x.body.children).find('.fullWhiteWidget .productDescription h3').text().trim(),
            href: s.burl,
            image_tn: s.burl + '/' + $(x.body.children).find('.fullWhiteWidget #zoom1 img').attr('src'),
            price: Number($(x.body.children).find('.fullWhiteWidget .cost').text().trim()),
            stock: 1,
            show: true
        };
        prds.push(prd);
        setMinMax(slider,prd);
      } catch (e) {
        console.log(i + $(x.body.children).find('.fullWhiteWidget .productDescription h3').text().trim() + e);
      }

    };

    http.get(s.burl, {cache: cache_req}).
      then( r => {
        let d = document.implementation.createHTMLDocument('xDeals_dealskw');
        d.body.innerHTML = r.data;
        scrap(d);        

      });
  },  

  sheeel: (http, prds, slider)=>{
    let s = sites.find(x=>(x.site=='sheeel')) ;

    let scrap = (x)=>{
      try {
        let prd = {
            site: s.site,
            product: $(x.body.children).find('.product-view .product-name').text().trim(),
            href: s.burl,
            image_tn: $(x.body.children).find('.product-view .product-img-box img').first().attr('src'),
            price: Number($(x.body.children).find('.product-view .price').first().text().replace(/KD/i, '')),
            stock: 1,
            show: true
        };
        prds.push(prd);
        setMinMax(slider,prd);
      } catch (e) {
        console.log(i + $(x.body.children).find('.product-view .product-name').text().trim() + e);
      }

    };

    http.get(s.burl, {cache: cache_req}).
      then( r => {
        let d = document.implementation.createHTMLDocument('xDeals_sheeel');
        d.body.innerHTML = r.data;
        scrap(d);        

      });
  },

}

export var xSearch = {
  
  xcite: (http, prds, slider, q)=>{

    let s = sites.find(x=>(x.site=='xcite')) ;

    http.get( s.burl + '/catalogsearch/result/?cat=&q=' + q, {cache: cache_req}).
      then( r => {
        let d = document.implementation.createHTMLDocument('xSearch_'+s.site);
        d.body.innerHTML = r.data;
        scrap_xcite(d,s,prds,slider);
    
      });


  },

  blink: (http, prds, slider, q)=>{

    let s = sites.find(x=>(x.site=='blink')) ;

    let scrap = (x)=>{
      let items = $(x.body.children).find('.innerPlist li');
      //let prds = [];
      for (let i = 0; i < items.length; i++) {
        try {
          let prd = {
              site: s.site,
              product: $(items[i]).children('a').children('img').attr('alt'),
              href: s.burl + $(items[i]).children('a').attr('href').split(/[?#]/)[0],
              image_tn: s.burl + $(items[i]).children('a').children('img').attr('src'),
              price: Number($(items[i]).find(' .price').html().split(/ /)[0]),
              stock: $(items[i]).find(' .outStock').html() === null ? 1 : 0,
              show: true
          };
          prds.push(prd);
          setMinMax(slider,prd);
        } catch (e) {
          console.log(i + $(items[i]).children('a').children('img').attr('alt') + e);
        }
      }
    };

    http.get(s.burl + '/search.aspx?text='+ q + '&searchfor=all', {cache: cache_req}).
      then( r => {
        let d = document.implementation.createHTMLDocument('xSearch_'+s.site);
        d.body.innerHTML = r.data;
        scrap(d);       

      });

  },  

  dealskw: (http, prds, slider, q)=>{

    let s = sites.find(x=>(x.site=='dealskw')) ;

    let scrap = (x)=>{
      let items = $(x.body.children).find('li');
      for (let i = 0; i < items.length; i++) {
        try {
          let prd = {
              site: s.site,
              product: $(items[i]).find('.title').children('a').attr('title'),
              href: s.burl + $(items[i]).find('a').attr('href').split(/[?#]/)[0],
              image_tn: s.burl + $(items[i]).find('img').attr('src'),
              price: Number($(items[i]).find('.cost:not(.discount)').find('.productCost ').html().trim().split(/ /)[0].trim()),
              stock: 1,
              show: true
          };
          prds.push(prd);
          setMinMax(slider,prd);
        } catch (e) {
          console.log(i + $(items[i]).find('.title').children('a').attr('title') + e);
        }
      }

    };

    http.get(s.burl, {cache: cache_req}).
      then( r => {
        let d = document.implementation.createHTMLDocument('xSearch_'+s.site);
        d.body.innerHTML = r.data;
        scrap(d);         

      });
  },  

  sheeel: (http, prds, slider)=>{
    let s = sites.find(x=>(x.site=='sheeel')) ;

    let scrap = (x)=>{
      try {
        let prd = {
            site: s.site,
            product: $(x.body.children).find('.product-view .product-name').text().trim(),
            href: s.burl,
            image_tn: $(x.body.children).find('.product-view .product-img-box img').first().attr('src'),
            price: Number($(x.body.children).find('.product-view .price').first().text().replace(/KD/i, '')),
            stock: 1,
            show: true
        };
        prds.push(prd);
        setMinMax(slider,prd);
      } catch (e) {
        console.log(i + $(x.body.children).find('.product-view .product-name').text().trim() + e);
      }

    };

    http.get(s.burl, {cache: cache_req}).
      then( r => {
        let d = document.implementation.createHTMLDocument('xDeals_sheeel');
        d.body.innerHTML = r.data;
        scrap(d);        

      });
  },

}

