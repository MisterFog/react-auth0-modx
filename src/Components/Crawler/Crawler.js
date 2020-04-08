import React, { Component } from 'react';
import Simplecrawler from 'simplecrawler';
import cheerio from 'cheerio';
import Callback from '../../Pages/Callback';
import './Crawler.css';

export default class Crawler extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     search: [],
  //     zero: false,
  //     show: false,
  //     url: ''
  //   };

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  state = {
    search: [],
    zero: false,
    show: false,
    url: '' //'http://localhost:3000/'  https://www.xplace.com/il/
  };

  crawler = url => {
    /* добавления префикса к URL-адресу прокси-сервера (CURL), который делает:
      1. Направляет запрос на https://example.com.
      2. Получает ответ от https://example.com.
      3. Добавляет Access-Control-Allow-Originзаголовок к ответу.
      4. Передает этот ответ с добавленным заголовком обратно в запрашивающий код внешнего интерфейса.
     */
    const proxyurl = 'http://cors-anywhere.herokuapp.com/';

    var crawler = new Simplecrawler(url); //(proxyurl + url);

    /** Извлекать ресурсы из домена переданного конструктору */
    crawler.domainWhitelist = [proxyurl];

    var i = 1;
    let foundLink = this.state.search;
    var _this = this;

    /** Определяет интервал, с которым сканер порождает новые запросы */
    crawler.interval = 5000; // 5 seconds

    /** Максимальный параллелизм запроса (ограничение колличества запросов) */
    crawler.maxConcurrency = 3;

    /** Глубина поиска */
    crawler.maxDepth = 2; // извлекается первая страница и найденные ссылки с нее

    /** Управляет соблюдением искателем правил robots.txt для любого домена*/
    crawler.respectRobotsTxt = false; //true;

    /** Определяет, выбирает ли сканер только те URL-адреса, где имя хоста соответствует хосту */
    crawler.filterByDomain = true;

    /** Определяет, следует ли извлекать URL-адреса, указывающие на поддомен хоста */
    crawler.scanSubdomains = true;

    /** Управляет тем, какие заголовки (кроме стандартных) включить в каждый запрос */
    crawler.customHeaders = {
      'Access-Control-Allow-Origin': url, // 'http://' + url // проверка, может ли ресурс быть доступен для контента на текущем домене
      Vary: 'Origin',
      'Content-Type': 'text/html'
    };

    crawler.on('crawlstart', function() {
      console.log('%c%s', 'color: orange;', 'Crawler starting');
    });

    /** Увольняется сразу после того, как запрос был инициирован */
    crawler.on('fetchstart', function(queueItem) {
      console.log('fetchStart', queueItem);
    });

    /** Выполняется, когда запрос завершен */
    crawler.on('fetchcomplete', function(queueItem, responseBuffer, response) {
      if (queueItem.stateData['code'] === 200) {
        console.log(
          '%c%s',
          'color: green; font: 1.2rem/1 Tahoma;',
          'Запрос № ' + i++
        );
        console.log(
          'I just received: %s (%d bytes)',
          queueItem.url,
          responseBuffer.length
        );
        console.log(
          'It was a resource of type: %s ',
          response.headers['content-type']
        );

        /** Поиск по HTML странице тегов ссылок с помощью cheerio*/
        crawler.discoverResources = function(buffer, queueItem) {
          var $ = cheerio.load(buffer.toString('utf8'));
          var n = 1;

          // return console.log($.html());

          foundLink = [];
          return $('link[href]')
            .map(function() {
              console.log(
                '%c%s',
                'color: blue;',
                n++ + ') ',
                $(this).attr('href')
              );

              foundLink.push($(this).attr('href'));

              return foundLink;
            })
            .get();
        };
      }
    });

    crawler.on('complete', function() {
      console.log('%c%s', 'color: orange;', 'Finished!');
      _this.setState({
        search: foundLink
      });
      _this.setState({
        zero: true
      });
    });

    crawler.start();

    /* Передача формы в телеграм бот
  https://api.telegram.org/bot1070380528:AAGFeLWfhsl4yrvl_6EuZij9gdSqBZV4dQo/getUpdates,
  где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */
    // var token = '1070380528:AAGFeLWfhsl4yrvl_6EuZij9gdSqBZV4dQo';
    // var chat_id = '-361113943'; //https://www.youtube.com/watch?v=Df-XGBabjv4
    // var arr = 'Результат поиска: ' + message;
    // var txt = null;
    // arr.map((value, key) => {
    //   return (txt += '<b>' + key + '</b> ' + value + '%0A');
    // });
    // var sendToTelegram =
    //   'https://api.telegram.org/bot' +
    //   token +
    //   '/sendMessage?chat_id=' +
    //   chat_id +
    //   '&parse_mode=html&text=' +
    //   txt;
  };

  handleChange = event => {
    this.setState({
      url: event.target.value
    });
  };

  handleSubmit = event => {
    this.crawler(this.state.url);
    this.setState({
      show: true
    });
    event.preventDefault();
  };

  render() {
    var { search, zero, show } = this.state;

    return (
      <div className="crawler">
        <form onSubmit={this.handleSubmit}>
          <label>
            Введите url:
            <input
              type="text"
              value={this.state.url}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Поиск" />
        </form>
        {this.state.url && <h2> Поиск по: {this.state.url} </h2>}
        <ol type="1">
          {search.length !== 0 ? (
            search.map((number, key) => {
              return <li key={key}> {number} </li>;
            })
          ) : show ? (
            !zero ? (
              <li>
                <Callback />
              </li>
            ) : (
              'Объекты поиска отсутствуют!'
            )
          ) : (
            ''
          )}
        </ol>
      </div>
    );
  }
}
