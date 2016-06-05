var kindredlist =
[
    {
        "id": 1388534400000,
        "name": "Human",
        "type": "Goodkin",
        "strmod": 1.0,
        "conmod": 1.0,
        "dexmod": 1.0,
        "spdmod": 1.0,
        "lkmod": 1.0,
        "iqmod": 1.0,
        "wizmod": 1.0,
        "chrmod": 1.0,
        "heightmod": 1.0,
        "weightmod": 1.0
    },
    {
        "id": 1420070400000,
        "name": "Dwarf (Gristlegrim)",
        "type": "Goodkin",
        "strmod": 2.0,
        "conmod": 2.0,
        "dexmod": 1.0,
        "spdmod": 1.0,
        "lkmod": 0.75,
        "iqmod": 1.0,
        "wizmod": 1.0,
        "chrmod": 1.0,
        "heightmod": 0.67,
        "weightmod": 2.0
    },
    {
        "id": 1420070500000,
        "name": "Uruk (Orc)",
        "type": "Illkin",
        "strmod": 1.1,
        "conmod": 1.1,
        "dexmod": 1.0,
        "spdmod": 1.0,
        "lkmod": 0.67,
        "iqmod": 0.75,
        "wizmod": 1.0,
        "chrmod": 1.1,
        "heightmod": 1.0,
        "weightmod": 1.0
    },
    {
        "id": 1420070500001,
        "name": "Elf",
        "type": "Goodkin",
        "strmod": 1.0,
        "conmod": 0.67,
        "dexmod": 1.33,
        "spdmod": 1.0,
        "lkmod": 1.0,
        "iqmod": 1.5,
        "wizmod": 1.5,
        "chrmod": 1.5,
        "heightmod": 1.1,
        "weightmod": 1.0
    }
];
var x = {
  "name" : "Bob",
  "kindred": {
    "id": 1420070500001,
    name: "Elf",
    "type": "Goodkin",
    "strmod": 1.0,
    "conmod": 0.67,
    "dexmod": 1.33,
    "spdmod": 1.0,
    "lkmod": 1.0,
    "iqmod": 1.5,
    "wizmod": 1.5,
    "chrmod": 1.5,
    "heightmod": 1.1,
    "weightmod": 1.0
  },
  "attributes" : {
    str : { value: 15,  specialized:false },
    con : { value: 11,  specialized:false },
    dex : { value: 12,  specialized:false },
    spd : { value: 13,  specialized:false },
    lk : { value: 14,  specialized:false },
    iq : { value: 15,  specialized:false },
    wiz : { value: 16,  specialized:false },
    chr : { value: 18,  specialized:false }
  },
  height: 11,
  weight: 12
};
var CharacterBox = React.createClass({
  rollOneDice: function(){
    return Math.ceil(Math.random() * 6);
  },
  getMultipleDice: function (numberofdice, taro){
    var dicearray = [];
    var i = 0;
    while(i < numberofdice){
      dicearray.push(this.rollOneDice());
      i =  i + 1;
    }
    if (taro){
      var firstvalue = dicearray[0];
      var issame = true;
      for(var x = 1; x < numberofdice; x++){
	if(firstvalue !== dicearray[x]){
	  issame = false;
	}
      }
      if(issame){
	dicearray = dicearray.concat(this.getMultipleDice(numberofdice,true));
      }
    }
    return dicearray;
  },
  getNewAttributeValue(mod,taro){
    var dicearray = this.getMultipleDice(3,taro);
    var total = dicearray.reduce(
      function(previousValue, currentValue, currentIndex, array) {
	return previousValue + currentValue;
      });
    if(mod > 1){
      total = Math.floor(total * mod);
    } else {
      total = Math.ceil(total * mod);
    }
    console.log(dicearray + " * " + mod);
    return { value: total, specialized : false};
  },
  getInitialState: function() {
      return x; 
  },
  handleRerollClick: function() {
    console.log("prestate:" + this.state);
    var newattributes = {
      str: this.getNewAttributeValue(this.state.kindred.strmod,true),
      con: this.getNewAttributeValue(this.state.kindred.conmod,true),
      dex: this.getNewAttributeValue(this.state.kindred.dexmod,true),
      spd: this.getNewAttributeValue(this.state.kindred.spdmod,true),
      lk: this.getNewAttributeValue(this.state.kindred.lkmod,true),
      iq: this.getNewAttributeValue(this.state.kindred.iqmod,true),
      wiz: this.getNewAttributeValue(this.state.kindred.wizmod,true),
      chr: this.getNewAttributeValue(this.state.kindred.chrmod,true)
    };
    var wt = this.getNewAttributeValue(this.state.kindred.weightmod,false).value;
    var ht = this.getNewAttributeValue(this.state.kindred.heightmod,false).value;
    console.log("new wt + ht:" + wt + " " + ht); 
    this.setState( {attributes: newattributes, weight: wt, height: ht } );
  }, 
  kindredChange: function(value){
    for(var i = 0; i < this.props.kindredlist.length; i++) {
      if(value == this.props.kindredlist[i].id){
        console.log(this.props.kindredlist[i]);
        this.setState({kindred: this.props.kindredlist[i]});
      }
    }
  },
  render: function(){
    return (
      <div className="CharacterBox">
        <span onClick={this.handleRerollClick}>Reroll</span>
        <CharacterName name={this.props.data.name} />
        <CharacterKindred kindredoptions={this.props.kindredlist}
            value={this.state.kindred.id}
            onChange={this.kindredChange}
          />
        <CharacterLevel attr={this.props.data.attributes} />
        <CharacterWeight weight={this.state.weight} height={this.state.height}/>
        <CharacterHeight height={this.state.height} />
        <AttributeBox attr={this.state.attributes} />
      </div>
    );
  }
});
var CharacterHeight = React.createClass({
  render: function(){
    var heightInCm = Math.round(126.4 + (this.props.height*5.6));
    return (
      <div>
        Height: {heightInCm} cm
      </div>
    );
  }
});
var CharacterWeight = React.createClass({
  render: function(){
    var heightInCm = 126.4 + (this.props.height*5.6);
    // ideal weight for male uses devine formula
    var idealWeightKg = Math.round(50 + (0.9055118 * (heightInCm-152.4)));
    return (
      <div>
        Weight: {idealWeightKg} kg
      </div>
    );
  }
});
var CharacterKindred = React.createClass({
  onChange: function(event) {
    this.props.onChange(event.target.value);
  },
  render: function(){
    return (
      <div className="CharacterKindred">
        <label>Kindred: {this.props.name}</label>
        <select onChange={this.onChange} value={this.props.value}>
          {this.props.kindredoptions.map(function(kin,key){
            return <option key={key} value={kin.id}>{kin.name}</option>
          })}
        </select>
      </div>
    );
  }
});
var CharacterName = React.createClass({
  render: function(){
    return (
      <div>
        Name: {this.props.name}
      </div>
    );
  }
});
var AttributeBox = React.createClass({
  render: function(){
    return (
      <div className="AttributeBox">
        <Attribute name="STR" data={this.props.attr.str}/>
        <Attribute name="CON" data={this.props.attr.con}/>
        <Attribute name="DEX" data={this.props.attr.dex}/>
        <Attribute name="SPD" data={this.props.attr.spd}/>
        <Attribute name="LK" data={this.props.attr.lk}/>
        <Attribute name="IQ" data={this.props.attr.iq}/>
        <Attribute name="WIZ" data={this.props.attr.wiz}/>
        <Attribute name="CHR" data={this.props.attr.chr}/>
        <PersonalAdds attr={this.props.attr}/>
      </div>
    );
  }
});
var Attribute = React.createClass({
  render: function(){
    return (
      <div className="Attribute">
        {this.props.name}:{this.props.data.value}
      </div>
    );
  }
});
var PersonalAdds = React.createClass({
  render: function(){
    return (
      <div className="PersonalAdds">
        Personal Adds: {
		Math.max(0,this.props.attr.str.value-12)+
		Math.max(0,this.props.attr.dex.value-12)+
		Math.max(0,this.props.attr.spd.value-12)+
		Math.max(0,this.props.attr.lk.value-12)
	}
      </div>
    );
  }
});
var CharacterLevel = React.createClass({
  render: function(){
    return (
      <div className="CharacterLevel">
        Level: {
		Math.floor(Math.max(this.props.attr.str.value,
		this.props.attr.con.value,
		this.props.attr.dex.value,
		this.props.attr.spd.value,
		this.props.attr.lk.value,
		this.props.attr.iq.value,
		this.props.attr.wiz.value,
		this.props.attr.chr.value)/10)
	}
      </div>
    );
  }
});

ReactDOM.render(
  <CharacterBox data={x} kindredlist={kindredlist}/>,
  document.getElementById('content')
);
