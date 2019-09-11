var selector = function(s){
    var _selector = s || "";
    var labels = [];
    this.build = function(){
        return _selector;
    };
    this.hasLabel = function(name){
        return labels.indexOf(name)>-1
    };
    this.label = function(name){
        labels.push(name);
        _selector+=name;
        this.equals = function(){
            _selector+="%3D";
            this.value = function(val){
                _selector+=val;
                this.and = function(){
                    _selector+=","
                    return this;
                }
                this.build = function(){
                    return _selector;
                }
                return this;
            }
            return this;
        }
        this.in = function(){
            _selector+="+in+";
            this.set = function(arr){
                _selector+="%28"+arr.join("%2C")+"%29";
                this.and = function(){
                    _selector+="%2C"
                    return this;
                }
                this.build = function(){
                    return _selector;
                }
                return this;
            }
            return this;
        }
        return this;
    }
}

module.exports = selector;
// Test
// let actual = new selector()
//         .label("environment").equals().value("production")
//         .and()
//         .label("tier").equals().value("frontend")
//         .and()
//         .label("environment").in().set(['production','qa'])
//         .and()
//         .label("tier").in().set(['frontend'])
//         .build();
// let expected = 'environment%3Dproduction,tier%3Dfrontend,environment+in+%28production%2Cqa%29%2Ctier+in+%28frontend%29';
// require('http/response').println(actual === expected);
// let s = new selector()
//         .label("environment").equals().value("production");
// actual = s.hasLabel("environment");
// expected = true;
// require('http/response').println(actual === expected);