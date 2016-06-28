var tours = [
  {
    id: 1,
    start: 'Thursday June 2',
    end: 'Sunday June 5',
    year: '2016',
    name: 'The memorial tournament presented by nationwide',
    region: 'TPC Southwind',
    city: 'Memphis, TN',
    purse: '8,500,000',
    winningShare: '1,530,000',
    fedezPoints: '500'
  },
  {
    id: 2,
    start: 'Monday July 27',
    end: 'Thursday July 30',
    year: '2016',
    name: 'The some other tournament presented by good people',
    region: 'TPC Southwind',
    city: 'New York, NY',
    purse: '7,300,000',
    winningShare: '2,120,000',
    fedezPoints: '600'
  }
];

var rounds = [
  {
    id: 1,
    value: '1 & 2'
  },
  {
    id: 2,
    value: '2 & 3'
  },
  {
    id: 3,
    value: '3 & 4'
  }
];

var App = React.createClass({

  getInitialState: function () {
    return {
      activeTourId: 1,
      activeRoundId: 2
    };
  },

  handleTourClick: function (tour) {
    this.setState({
      activeTourId: tour.id
    });
  },

  handleRoundClick: function (round) {
    this.setState({
      activeRoundId: round.id
    });
  },

  render: function () {

    return (
      <div className="app">
        <div className="container">
          <div className="app__top">
            <div className="app__left">
              <Title />
            </div>
            <div className="app__center">
              <Steps />
            </div>
            <div className="app__right">
              <Btn />
            </div>
          </div>
          <div className="app__bottom">
            <div className="app__left">
              <h3 className="tournaments__title">tournaments</h3>
              <Tournaments
                tours={this.props.tours}
                activeTourId={this.state.activeTourId}
                onTourClick={this.handleTourClick}/>
            </div>
            <div className="app__right">
              <Rounds
                rounds={this.props.rounds}
                activeRoundId={this.state.activeRoundId}
                onRoundClick={this.handleRoundClick}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Title = React.createClass ({

  render: function() {

    return (
      <h3 className="title">
        golf
      <span>
        hole in one
      </span>
      </h3>
    );
  }
});

var Steps = React.createClass ({

  render: function() {

    return (
      <div className="steps">
        <ul className="steps__list">
          <li className="steps__el is-active">
            <div className="step">
              <div className="step__top">
                <div className="step__ico">
                  <i className="ico ico_cup"></i>
                </div>
              </div>
              <div className="step__bottom">
                <span className="step__text">select round</span>
              </div>
            </div>
          </li>

          <li className="steps__el">
            <div className="step">
              <div className="step__top">
                <div className="step__ico">
                  <i className="ico ico_person"></i>
                </div>
              </div>
              <div className="step__bottom">
                <span className="step__text">select candidates</span>
              </div>
            </div>
          </li>

          <li className="steps__el">
            <div className="step">
              <div className="step__top">
                <div className="step__ico">
                  <i className="ico ico_dollar"></i>
                </div>
              </div>
              <div className="step__bottom">
                <span className="step__text">entry fee</span>
              </div>
            </div>
          </li>

          <li className="steps__el">
            <div className="step">
              <div className="step__top">
                <div className="step__ico">
                  <i className="ico ico_persons"></i>
                </div>
              </div>
              <div className="step__bottom">
                <span className="step__text">invite friends</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
});

var Btn = React.createClass ({

  render: function() {
    var cls = 'btn ';

    return (
      <div className="action">
        <span className={cls}>exit</span>
        <span className={cls + 'is-grey'}>next</span>
      </div>
    );
  }
});


var Tournaments = React.createClass({

  onClick: function (tour) {
    this.props.onTourClick(tour);
  },

  render: function () {
    var items = this.props.tours.map(function (t) {

      return (
        <Tournament
          id={t.id}
          key={t.id}
          start={t.start}
          end={t.end}
          year={t.year}
          name={t.name}
          region={t.region}
          city={t.city}
          purse={t.purse}
          winningShare={t.winningShare}
          fedezPoints={t.fedezPoints}
          active={this.props.activeTourId}
          onClick={this.onClick.bind(this, t)}/>
      )
    }.bind(this));

    return (
      <section className="tournaments">
        {items}
      </section>
    )
  }
});


var Tournament = React.createClass({

  render: function () {
    var cls = 'tournament';

    return (
      <article
        className={this.props.active == this.props.id ? cls + ' is-active' : cls}
        onClick={this.props.onClick}>
        <header className="tournament__head">
          <DateTime
            start={this.props.start}
            end={this.props.end}
            year={this.props.year}/>
        </header>

        <h1 className="tournament__name">{this.props.name}</h1>

        <div className="tournament__where">
          <Location region={this.props.region} city={this.props.city}/>
        </div>

        <div className="tournament__prizes">
          <Prize value={this.props.purse} label="Purse"/>
          <Prize value={this.props.winningShare} label="Winning share"/>
          <Prize value={this.props.fedezPoints} label="Fedez points"/>
        </div>

        <span className="switcher"></span>
      </article>
    );
  }
});


var Prize = React.createClass({

  render: function () {

    return (
      <div className="prize">
        <p className="prize__sum">{this.props.value}</p>
        <p className="prize__text">{this.props.label}</p>
      </div>
    );
  }
});

var Location = React.createClass({

  render: function () {

    return (
      <div className="location">
        <span className="region">{this.props.region}</span>
        <span className="city">{this.props.city}</span>
      </div>
    );
  }
});

var DateTime = React.createClass({

  render: function () {

    return (
      <div className="date-time">
        <span className="start">{this.props.start}</span>
        <span> &ndash; </span>
        <span className="end">{this.props.end}, </span>
        <span className="year">{this.props.year}</span>
      </div>
    );
  }
});


var Rounds = React.createClass({

  onClick: function (round) {
    this.props.onRoundClick(round);
  },

  render: function () {
    var items = this.props.rounds.map(function (r) {
      return (
        <Round
          id={r.id}
          key={r.id}
          value={r.value}
          active={this.props.activeRoundId}
          onClick={this.onClick.bind(this, r)}/>
      )
    }.bind(this));

    return (
      <section className="rounds">
        <header className="rounds__head">
          <span className="rounds__title">Rounds</span>
          <a className="rules-link" href="#">Rules</a>
        </header>

        {items}
      </section>
    )
  }
});


var Round = React.createClass({

  render: function () {
    var cls = 'round';

    return <div
      className={this.props.active == this.props.id ? cls + ' is-active' : cls}
      onClick={this.props.onClick}>
      <div className="round__left">
        <span>Round </span>
        <span>{this.props.value}</span>
      </div>
      <div className="round__right">
        <span className="switcher"></span>
      </div>
    </div>;
  }
});


ReactDOM.render(
  <App tours={tours} rounds={rounds}/>,
  document.getElementById('content')
);

