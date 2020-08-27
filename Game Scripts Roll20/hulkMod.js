on("ready",function(){
    on("chat:message",function(msg){
      if(msg.type=="api" && msg.content.indexOf("!HulkOut")===0){
        let bruceBanner = charFinder("Bruce Banner");
        let theHulk = charFinder("The Hulk");
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
        //validate that the character selected is banner
        if(selectedTokenChar.id != bruceBanner.charID){
          sendChat("Hulk Mod","Please select Dr. Banner");
          return;
          }
        //cool effect
        spawnFx(selectedSingleToken.get("left"),selectedSingleToken.get("top"),"nova-acid",selectedSingleToken.get("pageid"));
        //update token
        selectedSingleToken.set({
          name: "The Hulk",
          imgsrc: "https://s3.amazonaws.com/files.d20.io/images/148502392/bpjTrb1apZT_AuaFx9dt1Q/thumb.png?15940049075555",
          layer: selectedSingleToken.get("layer"),
          width: 140,
          height: 140,
          controlledby: theHulk.charControlledBy,
          top: selectedSingleToken.get("top"),
          left: selectedSingleToken.get("left"),
          pageid: selectedSingleToken.get("pageid"),
          represents: theHulk.charID,
          bar1_link: theHulk.hpID,
          bar1_value: theHulk.hpCurrent,
          bar1_max: theHulk.hpMax,
          bar2_link: theHulk.acID,
          bar2_value: theHulk.ac,
        });
        
      }
      
      if(msg.type=="api" && msg.content.indexOf("!SunGoingDown")===0){
        let bruceBanner = charFinder("Bruce Banner");
        let theHulk = charFinder("The Hulk");
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
        //validate that the character selected is The Hulk
        if(selectedTokenChar.id != theHulk.charID){
            sendChat("Hulk Mod","Please select The Hulk");
            return;
            }
        //cool effect
        spawnFx(selectedSingleToken.get("left"),selectedSingleToken.get("top"),"nova-smoke",selectedSingleToken.get("pageid"));
        //update token
        selectedSingleToken.set({
          name: "Bruce Banner",
          imgsrc: "https://s3.amazonaws.com/files.d20.io/images/148499862/XL3BnwETUiYaogf4k_0_Ow/thumb.png?159400402255",
          layer: selectedSingleToken.get("layer"),
          width: 70,
          height: 70,
          controlledby: bruceBanner.charControlledBy,
          top: selectedSingleToken.get("top"),
          left: selectedSingleToken.get("left"),
          pageid: selectedSingleToken.get("pageid"),
          represents: bruceBanner.charID,
          bar1_link: bruceBanner.hpID,
          bar1_value: bruceBanner.hpCurrent,
          bar1_max: bruceBanner.hpMax,
          bar2_link: bruceBanner.acID,
          bar2_value: bruceBanner.ac,
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
  