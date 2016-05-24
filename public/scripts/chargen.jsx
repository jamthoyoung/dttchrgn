
var x = {
  "name" : "Bob",
  "kindred": {
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
  },
  "attributes" : {
    str : { value: 10,  specialized:false },
    con : { value: 11,  specialized:false },
    dex : { value: 12,  specialized:false },
    spd : { value: 13,  specialized:false },
    lk : { value: 14,  specialized:false },
    iq : { value: 15,  specialized:false },
    wiz : { value: 16,  specialized:false },
    chr : { value: 18,  specialized:false }
  },
  height: 11,
  weigth: 11,
  personaladds: function() {
    return
    Math.min(0, this.attributes.str.value) +
    Math.min(0, this.attributes.dex.value) +
    Math.min(0, this.attributes.spd.value) +
    Math.min(0, this.attributes.lk.value);
  }
};
var CharacterBox = React.createClass({
  render: function(){
    return (
      <div className="CharacterBox">
        Well ain't this exciting, {this.props.data.name}.
        <AttributeBox attr={this.props.data.attributes} />
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

ReactDOM.render(
  <CharacterBox data={x} />,
  document.getElementById('content')
);
