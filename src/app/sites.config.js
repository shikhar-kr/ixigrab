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
    deals: true,
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

export var xSites = sites.filter(x=>x.active)
						 .sort((a,b)=>(a.order-b.order));
export var xCurrency = 'KD';

/* Deals */
export function dealsXcite() {
  

  return ;
}
