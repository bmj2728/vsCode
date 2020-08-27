on("ready",function(){
    on("chat:message",function(msg){
      if(msg.type=="api" && msg.content.indexOf("!FlameOn")===0){
        let johnny = charFinder("Johnny Storm (The Human Torch)"); 
        let selectedTokens = msg.selected;
        //check to see if there is a selected token
        if (selectedTokens===undefined){
          sendChat("Token Helper","Please select a token.");
          return;
          }
        //check to see if there are more than one selected tokens
        if (selectedTokens.length>1){
          sendChat("Token Helper","Please select a single token.");
          return;
          }
        //identifying the single selected token from the selected array object
        let selectedSingleToken = getObj("graphic",selectedTokens[0]._id);
        //identifying the character represented by the selected token
        let selectedTokRep = selectedSingleToken.get("represents");
        //get the character object represented by the token
        let selectedTokenChar = getObj("character", selectedTokRep);
        //validate that the character selected is Johnny
        if(selectedTokenChar.id != johnny.charID){
          sendChat("Flame On","Please select Johnny Storm");
          return;
          }
        //cool fire burst effect
        spawnFx(selectedSingleToken.get("left"),selectedSingleToken.get("top"),"explosion-fire",selectedSingleToken.get("pageid"));
        //update token
        selectedSingleToken.set({
          name: "The Human Torch",
          imgsrc: "https://s3.amazonaws.com/files.d20.io/images/149847381/8OZAArO8GKmBUKVPu_kVBQ/thumb.png?15945213345",
          layer: selectedSingleToken.get("layer"),
          light_hassight: true,
          light_radius: 60,
          light_dimradius: 30,
          light_otherplayers: true,
        });
        
      }
      
      if(msg.type=="api" && msg.content.indexOf("!FlameOff")===0){
        let johnny = charFinder("Johnny Storm (The Human Torch)"); 
        let selectedTokens = msg.selected;
        //check to see if there is a selected token
        if (selectedTokens===undefined){
          sendChat("Token Helper","Please select a token.");
          return;
          }
        //check to see if there are more than one selected tokens
        if (selectedTokens.length>1){
          sendChat("Token Helper","Please select a single token.");
          return;
          }
        //identifying the single selected token from the selected array object
        let selectedSingleToken = getObj("graphic",selectedTokens[0]._id);
        //identifying the character represented by the selected token
        let selectedTokRep = selectedSingleToken.get("represents");
        //get the character object represented by the token
        let selectedTokenChar = getObj("character", selectedTokRep);
        //validate that the character selected is Johnny
        if(selectedTokenChar.id != johnny.charID){
            sendChat("Flame On","Please select Johnny Storm");
            return;
            }
        //cool fire burst effect
        spawnFx(selectedSingleToken.get("left"),selectedSingleToken.get("top"),"nova-smoke",selectedSingleToken.get("pageid"));
        //update token
        selectedSingleToken.set({
          name: "Johnny Storm",
          imgsrc: "https://s3.amazonaws.com/files.d20.io/images/150328774/TVy52mEd9dtrNYzuvhAjrg/thumb.png?15947006495",
          layer: selectedSingleToken.get("layer"),
          light_hassight: true,
          light_radius: 0,
          light_dimradius: 0,
          light_otherplayers: false,
        });
      }
    });
  });
  
  
  function charFinder(charName) {
    //start getInfo
    //find the characer object
    var charFinder = findObjs({
      _type: "character",
      name: charName
      });
                      
    //check to make sure there aren't multiple characters that have that name
    if(charFinder.length<1||charFinder.length>1) {
      sendChat("CharFinder", "There are too few or too many " + charName + "s. Help me DM! You're my only hope.");
      return;
      }
    //obtaining the character's info
    //get the character onject
    var char = getObj("character",charFinder[0].id);
    //get the character name
    var characterName = char.get("name");
    //get who controls the character
    var characterControlledBy = char.get("controlledby");
    //find all AC attributes for the character
    var charACHelper = findObjs({
      _type: "attribute",
      _characterid: char.id,
      name: "ac"
      });
    //find all npc_ac attributes for the character
    var charNPCACHelper = findObjs({
      _type: "attribute",
      _characterid: char.id,
      name: "npc_ac"
      });
    //find all HP attributes for the character
    var charHPHelper = findObjs({
      _type: "attribute",
      _characterid: char.id,
      name: "hp"
      });
    //get char's attributes
    //HP
    var charHP = getObj("attribute",charHPHelper[0].id);
    var charHPCurrent = charHP.get("current");
    var charHPMax = charHP.get("max");
    //AC
    var charAC = getObj("attribute",charACHelper[0].id);
    var charACCurrent = charAC.get("current");
    var charNPCAC = getObj("attribute",charNPCACHelper[0].id);
    var charNPCACCurrent = charNPCAC.get("current");
    //declare and assign value to returned character object
    var foundChar = {
      name : characterName,
      charID : char.id,
      charControlledBy : characterControlledBy,
      hpCurrent : charHPCurrent,
      hpMax : charHPMax,
      ac : charACCurrent,
      npcAC : charNPCACCurrent,
      hpID : charHP.id,
      acID : charAC.id,
      npcacID : charNPCAC.id
      };  
    return foundChar;
    //end getInfo
  }
  