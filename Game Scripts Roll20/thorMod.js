on("ready",function(){
    on("chat:message",function(msg){
      if(msg.type=="api" && msg.content.indexOf("!Worthy")===0){
        let thor = charFinder("Thor Odinson");
        let donBlake = charFinder("Donald Blake");
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
        //validate that the character selected is Donald Blake
        if(selectedTokenChar.id != donBlake.charID){
          sendChat("Thor Mod","Please select Dr. Blake");
          return;
          }
        //cool effect
        spawnFx(selectedSingleToken.get("left"),selectedSingleToken.get("top"),"burst-magic",selectedSingleToken.get("pageid"));
        //update token
        selectedSingleToken.set({
          name: "Thor",
          imgsrc: "https://s3.amazonaws.com/files.d20.io/images/148556095/E_SnEIPpE-0LgZd6Vp8Qmg/thumb.png?15940409655",
          represents: thor.charID,
          bar1_link: thor.hpID,
          bar2_link: thor.npcacID,
          bar1_value: thor.hpCurrent,
          bar1_max: thor.hpMax,
          bar2_value: thor.npcAC
        });
        
      }
      
      if(msg.type=="api" && msg.content.indexOf("!Unworthy")===0){
        let thor = charFinder("Thor Odinson");
        let donBlake = charFinder("Donald Blake");
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
        //validate that the character selected is Thor
        if(selectedTokenChar.id != thor.charID){
            sendChat("Thor Mod","Please select The Mighty Thor");
            return;
            }
        //cool effect
        spawnFx(selectedSingleToken.get("left"),selectedSingleToken.get("top"),"burst-magic",selectedSingleToken.get("pageid"));
        //update token
        selectedSingleToken.set({
          name: "Donald Blake",
          imgsrc: "https://s3.amazonaws.com/files.d20.io/images/148562873/6il0wBxfRAqTqNMo6sOdZA/thumb.png?15940440865",
          represents: donBlake.charID,
          bar1_link: donBlake.hpID,
          bar2_link: donBlake.acID,
          bar1_value: donBlake.hpCurrent,
          bar1_max: donBlake.hpMax,
          bar2_value: donBlake.ac
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
      hpID : charHP.id,
      hpCurrent : charHPCurrent,
      hpMax : charHPMax,
      acID : charAC.id,
      ac : charACCurrent,
      npcACID : charNPCAC.id,
      npcAC : charNPCACCurrent
     };
    return foundChar;
    //end getInfo
  }
  