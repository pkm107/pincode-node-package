"use strict";

var pincodeData = require('./postoffices.json');

function isNumeric(num) {
    return !isNaN(num);
}

module.exports = {
    lookup: function lookup(pincode,type='') {
        if(pincode === undefined || pincode === ''){
            return pincodeData.records.slice(0,10);
        }
        if (isNumeric(pincode)) {
            if (typeof pincode === 'string') {
                return pincodeData.records.filter(function(e) {
                    return e.pincode === pincode;
                });
            } else if (typeof pincode === 'number') {
                return pincodeData.records.filter(function(e) {
                    return e.pincode === pincode.toString();
                });
            }
        } else {
            var regex = RegExp(pincode, 'i');
            if(type !== ''){                
                return pincodeData.records.filter(function(e) {                                  
                    return e[type] === pincode;
                });
            }
            else{
                return pincodeData.records.filter(function(e) {
                    return e.officename.match(regex);
                });
            }
            
        }
    },
    lookupby_pin : function lookupby_pin(pincode){
        if (isNumeric(pincode)) {
            if (typeof pincode === 'string') {
                return pincodeData.records.filter(function(e) {
                    return e.pincode === pincode;
                });
            } else if (typeof pincode === 'number') {
                return pincodeData.records.filter(function(e) {
                    return e.pincode === pincode.toString();
                });
            }
        }
        else{
            return pincodeData.records.slice(0,10);
        }
    },

    lookupby_state_dist_taluk(state,dist,taluk){        
        var values = pincodeData.records.filter(function(e) {
            return e.statename.toLowerCase() === state.toLowerCase();
        })
        if(dist){
            values = values.filter(function(e){
                return e.districtname.toLowerCase() === dist.toLowerCase();
            });
        }        
        if(taluk){
            values = values.filter(function(e){                
                return e.taluk.toLowerCase() === taluk.toLowerCase();
            })
        }

        return values;
    },
    getcount: function getcount(){
        return pincodeData.records.length;
    },
    getstates: function getstates(){
        var states = [];
        for(var i=0;i<pincodeData.records.length;i++){
            var statename = pincodeData.records[i].statename
            if(states.indexOf(statename) === -1){
                states.push(statename);
            }            
        }
        return states;
    },

    getdistricts: function getdistricts(state){
        if(state){
            var values = pincodeData.records.filter(function(e){
                return e.statename.toLowerCase() === state.toLowerCase();
            });
            var districts = [];
            for(var i=0;i<values.length;i++){
                var dist = values[i].districtname;
                if(districts.indexOf(dist) === -1){
                    districts.push(dist);
                }
            }
            return districts
        }
    },

    gettaluks: function gettaluks(state,dist){
        var values = pincodeData.records.filter(function(e){
            return e.statename.toLowerCase() === state.toLowerCase()
            && e.districtname.toLowerCase() === dist.toLowerCase();
        });
        var taluks = [];
        for(var i=0;i<values.length;i++){
            var taluk = values[i].taluk;
            if(taluks.indexOf(taluk) === -1){
                taluks.push(taluk);
            }
        }
        return taluks;
    }
}