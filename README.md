# About

This is a Google Chrome App that consumes Google news RSS feeds for easy viewing of new stories. It supports localization and will automatically detect the users language settings providing feeds from the source that best matches their language.

# Getting Setup

To run this Google Chrome App you will need to have the latest [Google Chrome Canary](https://tools.google.com/dlpage/chromesxs/) installed with a few of the options changed. Open the [chrome://flags/](chrome://flags/) page and enable the following settings:

* Browser Plugin (set to "Everywhere")
* Experimental Extension APIs
* Enable platform apps

Open extension settings (select the Chrome wrench tool > Tools > Extensions) and Check "Developer mode".

To load the application click the "Load unpacked extension..." button in the extension settings and brows to the "app" folder within the codebase. Finally open a new tab and you should see the application icon on the home screen, click it to launch.

# Documentation

TBA

# Building the application

The app comes ready to run, if you wish to rebuild the templates or documentation you will need a working [node.js](http://nodejs.org/) installation along with the [Jake](https://github.com/mde/jake) package which can be installed using

`npm install -g jake`

To see a list of tasks run `jake -T`. To build the documentation you will need [docco](http://jashkenas.github.com/docco/) installed

# Testing

Currently Rake is used to run the test suite so ruby 1.9.3 will need to be installed with ruby gems and bundler. Then run `rake jasmine` to get the [Jasmine](http://pivotal.github.com/jasmine/) server running.

# Credits

This Google Chrome App was developed by Jamie Dyer <http://kernowsoul.com> and Chris Garrett <http://abstraktion.co.uk>

# Reference

[Information on Google news feed parameters](http://blog.slashpoundbang.com/post/12975232033/google-news-search-parameters-the-missing-manual)

## Google Feed uri's

* Top Stories   http://news.google.com/news?ned=uk&output=rss&topic=h
* News Near You http://news.google.com/news?ned=uk&output=rss&geo=detect_metro_area
* World         http://news.google.com/news?ned=uk&output=rss&topic=w
* Business      http://news.google.com/news?ned=uk&output=rss&topic=b
* U.K.          http://news.google.com/news?ned=uk&output=rss&topic=n
* Technology    http://news.google.com/news?ned=uk&output=rss&topic=tc
* Entertainment http://news.google.com/news?ned=uk&output=rss&topic=e
* Sports        http://news.google.com/news?ned=uk&output=rss&topic=s
* Science       http://news.google.com/news?ned=uk&output=rss&topic=snc
* Health        http://news.google.com/news?ned=uk&output=rss&topic=m
* Spotlight     http://news.google.com/news?ned=uk&output=rss&topic=ir

## Languages supported by Google news feeds

### Asia
* au        - Australia
* in        - India
* en_il     - Israel
* en_my     - Malaysia
* nz        - New Zealand
* en_pk     - Pakistan
* en_ph     - Philippines
* en_sg     - Singapore
* ar_me     - العالم العربي (Arab world)
* ar_ae     - الإمارات (UAE)
* ar_lb     - لبنان (Lebanon)
* ar_sa     - السعودية (KSA)
* cn        - 中国版 (China)
* hk        - 香港版 (Hong Kong)
* hi_in     - भारत (India)
* ta_in     - தமிழ்(India)
* ml_in     - മലയാളം (India)
* te_in     - తెలుగు (India)
* iw_il     - ישראל (Israel)
* jp        - 日本 (Japan)
* kr        - 한국 (Korea)
* tw        - 台灣版 (Taiwan)
* vi_vn     - Việt Nam (Vietnam)

### Europe & Africa
* nl_be     - België
* fr_be     - Belgique
* en_bw     - Botswana
* cs_cz     - Česká republika
* de        - Deutschland
* es        - España
* en_et     - Ethiopia
* fr        - France
* en_gh     - Ghana
* en_ie     - Ireland
* it        - Italia
* en_ke     - Kenya
* hu_hu     - Magyarország
* fr_ma     - Moroc
* en_na     - Namibia
* nl_nl     - Nederland
* en_ng     - Nigeria
* no_no     - Norge
* de_at     - Österreich
* pl_pl     - Polska
* pt-PT_pt  - Portugal
* de_ch     - Schweiz
* fr_sn     - Sénégal
* en_za     - South Africa
* fr_ch     - Suisse
* sv_se     - Sverige
* en_tz     - Tanzania
* tr_tr     - Türkiye
* en_ug     - Uganda
* uk        - U.K.
* en_zw     - Zimbabwe
* ar_eg     - مصر (Egypt)
* el_gr     - Ελλάδα (Greece)
* ru_ru     - Россия (Russia)
* sr_rs     -  Србија (Serbia)
* ru_ua     - Украина (Ukraine)
* uk_ua     - Україна (Ukraine)

### North & South America
* es_ar     - Argentina
* pt-BR_br  - Brasil
* ca        - Canada English
* fr_ca     - Canada Français
* es_cl     - Chile
* es_co     - Colombia
* es_cu     - Cuba
* es_us     - Estados Unidos
* es_mx     - México
* es_pe     - Perú
* us        - U.S.
* es_ve     - Venezuela
