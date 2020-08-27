on("ready",function(){
    on("chat:message",function(msg){
      if(msg.type=="api" && msg.content.indexOf("!SuitUp")===0){
        let tony = charFinder("Tony Stark");
        let ironMan = charFinder("Tony Stark(w/Armor)");
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
        //validate that the character selected is tony
        if(selectedTokenChar.id != tony.charID){
          sendChat("Iron Man Mod","Please select Mr. Stark");
          return;
          }
        //cool effect
        spawnFx(selectedSingleToken.get("left"),selectedSingleToken.get("top"),"explosion-holy",selectedSingleToken.get("pageid"));
        //update token
        selectedSingleToken.set({
          name: "Iron Man",
          imgsrc: "https://s3.amazonaws.com/files.d20.io/images/148514283/60e6t8YKOyE0xzZdZg2FHA/thumb.png?15940108265",
          represents: ironMan.charID,
          bar1_link: ironMan.hpID,
          bar2_link: ironMan.acID,
          bar1_value: ironMan.hpCurrent,
          bar1_max: ironMan.hpMax,
          bar2_value: ironMan.ac
        });
        
      }
      
      if(msg.type=="api" && msg.content.indexOf("!SuitOff")===0){
        let tony = charFinder("Tony Stark");
        let ironMan = charFinder("Tony Stark(w/Armor)");
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
        //validate that the character selected is Iron Man
        if(selectedTokenChar.id != ironMan.charID){
            sendChat("Iron Man Mod","Please select Iron Man");
            return;
            }
        //cool effect
        spawnFx(selectedSingleToken.get("left"),selectedSingleToken.get("top"),"explosion-holy",selectedSingleToken.get("pageid"));
        //update token
        selectedSingleToken.set({
          name: "Tony Stark",
          imgsrc: "https://s3.amazonaws.com/files.d20.io/images/148514296/40eaF8i-rz1rtpYylK55nQ/thumb.png?15940108315",
          represents: tony.charID,
          bar1_link: tony.hpID,
          bar2_link: tony.acID,
          bar1_value: tony.hpCurrent,
          bar1_max: tony.hpMax,
          bar2_value: tony.ac
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
  