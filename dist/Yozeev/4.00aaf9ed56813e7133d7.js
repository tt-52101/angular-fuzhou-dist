(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{WmWM:function(e,t,n){"use strict";var o=n("mrSG"),r=function(e){function t(t,n){var o=this,r=this.constructor.prototype;return(o=e.call(this,t)||this).statusCode=n,o.__proto__=r,o}return Object(o.__extends)(t,e),t}(Error),i=function(e){function t(t){void 0===t&&(t="A timeout occurred.");var n=this,o=this.constructor.prototype;return(n=e.call(this,t)||this).__proto__=o,n}return Object(o.__extends)(t,e),t}(Error),s=function(e){function t(t){void 0===t&&(t="An abort occurred.");var n=this,o=this.constructor.prototype;return(n=e.call(this,t)||this).__proto__=o,n}return Object(o.__extends)(t,e),t}(Error),a=function(){return function(e,t,n){this.statusCode=e,this.statusText=t,this.content=n}}(),c=function(){function e(){}return e.prototype.get=function(e,t){return this.send(Object(o.__assign)({},t,{method:"GET",url:e}))},e.prototype.post=function(e,t){return this.send(Object(o.__assign)({},t,{method:"POST",url:e}))},e.prototype.delete=function(e,t){return this.send(Object(o.__assign)({},t,{method:"DELETE",url:e}))},e.prototype.getCookieString=function(e){return""},e}(),u=function(e){return e[e.Trace=0]="Trace",e[e.Debug=1]="Debug",e[e.Information=2]="Information",e[e.Warning=3]="Warning",e[e.Error=4]="Error",e[e.Critical=5]="Critical",e[e.None=6]="None",e}({}),l=function(){function e(){}return e.prototype.log=function(e,t){},e.instance=new e,e}(),h=function(){function e(){}return e.isRequired=function(e,t){if(null==e)throw new Error("The '"+t+"' argument is required.")},e.isIn=function(e,t,n){if(!(e in t))throw new Error("Unknown "+n+" value: "+e+".")},e}();function p(e,t){var n="";return g(e)?(n="Binary data of length "+e.byteLength,t&&(n+=". Content: '"+function(e){var t=new Uint8Array(e),n="";return t.forEach((function(e){n+="0x"+(e<16?"0":"")+e.toString(16)+" "})),n.substr(0,n.length-1)}(e)+"'")):"string"==typeof e&&(n="String data of length "+e.length,t&&(n+=". Content: '"+e+"'")),n}function g(e){return e&&"undefined"!=typeof ArrayBuffer&&(e instanceof ArrayBuffer||e.constructor&&"ArrayBuffer"===e.constructor.name)}function f(e,t,n,r,i,s,a){return Object(o.__awaiter)(this,void 0,void 0,(function(){var c,l,h,f,d;return Object(o.__generator)(this,(function(o){switch(o.label){case 0:return i?[4,i()]:[3,2];case 1:(h=o.sent())&&((c={}).Authorization="Bearer "+h,l=c),o.label=2;case 2:return e.log(u.Trace,"("+t+" transport) sending data. "+p(s,a)+"."),f=g(s)?"arraybuffer":"text",[4,n.post(r,{content:s,headers:l,responseType:f})];case 3:return d=o.sent(),e.log(u.Trace,"("+t+" transport) request complete. Response status: "+d.statusCode+"."),[2]}}))}))}var d,v,b=function(){function e(){this.observers=[]}return e.prototype.next=function(e){for(var t=0,n=this.observers;t<n.length;t++)n[t].next(e)},e.prototype.error=function(e){for(var t=0,n=this.observers;t<n.length;t++){var o=n[t];o.error&&o.error(e)}},e.prototype.complete=function(){for(var e=0,t=this.observers;e<t.length;e++){var n=t[e];n.complete&&n.complete()}},e.prototype.subscribe=function(e){return this.observers.push(e),new y(this,e)},e}(),y=function(){function e(e,t){this.subject=e,this.observer=t}return e.prototype.dispose=function(){var e=this.subject.observers.indexOf(this.observer);e>-1&&this.subject.observers.splice(e,1),0===this.subject.observers.length&&this.subject.cancelCallback&&this.subject.cancelCallback().catch((function(e){}))},e}(),w=function(){function e(e){this.minimumLogLevel=e}return e.prototype.log=function(e,t){if(e>=this.minimumLogLevel)switch(e){case u.Critical:case u.Error:console.error("["+(new Date).toISOString()+"] "+u[e]+": "+t);break;case u.Warning:console.warn("["+(new Date).toISOString()+"] "+u[e]+": "+t);break;case u.Information:console.info("["+(new Date).toISOString()+"] "+u[e]+": "+t);break;default:console.log("["+(new Date).toISOString()+"] "+u[e]+": "+t)}},e}(),m=(d=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},function(e,t){function n(){this.constructor=e}d(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),S=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e};if("undefined"==typeof XMLHttpRequest){var k=require;v=k("request")}var C=function(e){function t(t){var n=e.call(this)||this;if(void 0===v)throw new Error("The 'request' module could not be loaded.");return n.logger=t,n.cookieJar=v.jar(),n.request=v.defaults({jar:n.cookieJar}),n}return m(t,e),t.prototype.send=function(e){var t=this;return new Promise((function(n,o){var c;c=g(e.content)?Buffer.from(e.content):e.content||"";var l=t.request(e.url,{body:c,encoding:"arraybuffer"===e.responseType?null:"utf8",headers:S({"X-Requested-With":"XMLHttpRequest"},e.headers),method:e.method,timeout:e.timeout},(function(s,c,l){if(e.abortSignal&&(e.abortSignal.onabort=null),s)return"ETIMEDOUT"===s.code&&(t.logger.log(u.Warning,"Timeout from HTTP request."),o(new i)),t.logger.log(u.Warning,"Error from HTTP request. "+s),void o(s);c.statusCode>=200&&c.statusCode<300?n(new a(c.statusCode,c.statusMessage||"",l)):o(new r(c.statusMessage||"",c.statusCode||0))}));e.abortSignal&&(e.abortSignal.onabort=function(){l.abort(),o(new s)})}))},t.prototype.getCookieString=function(e){return this.cookieJar.getCookieString(e)},t}(c),T=function(e){function t(t){var n=e.call(this)||this;return n.logger=t,n}return Object(o.__extends)(t,e),t.prototype.send=function(e){var t=this;return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new s):e.method?e.url?new Promise((function(n,o){var c=new XMLHttpRequest;c.open(e.method,e.url,!0),c.withCredentials=!0,c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.setRequestHeader("Content-Type","text/plain;charset=UTF-8");var l=e.headers;l&&Object.keys(l).forEach((function(e){c.setRequestHeader(e,l[e])})),e.responseType&&(c.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=function(){c.abort(),o(new s)}),e.timeout&&(c.timeout=e.timeout),c.onload=function(){e.abortSignal&&(e.abortSignal.onabort=null),c.status>=200&&c.status<300?n(new a(c.status,c.statusText,c.response||c.responseText)):o(new r(c.statusText,c.status))},c.onerror=function(){t.logger.log(u.Warning,"Error from HTTP request. "+c.status+": "+c.statusText+"."),o(new r(c.statusText,c.status))},c.ontimeout=function(){t.logger.log(u.Warning,"Timeout from HTTP request."),o(new i)},c.send(e.content||"")})):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))},t}(c),E=function(e){function t(t){var n=e.call(this)||this;return n.httpClient="undefined"!=typeof XMLHttpRequest?new T(t):new C(t),n}return Object(o.__extends)(t,e),t.prototype.send=function(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new s):e.method?e.url?this.httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))},t.prototype.getCookieString=function(e){return this.httpClient.getCookieString(e)},t}(c),I=function(){function e(){}return e.write=function(t){return""+t+e.RecordSeparator},e.parse=function(t){if(t[t.length-1]!==e.RecordSeparator)throw new Error("Message is incomplete.");var n=t.split(e.RecordSeparator);return n.pop(),n},e.RecordSeparatorCode=30,e.RecordSeparator=String.fromCharCode(e.RecordSeparatorCode),e}(),P=function(){function e(){}return e.prototype.writeHandshakeRequest=function(e){return I.write(JSON.stringify(e))},e.prototype.parseHandshakeResponse=function(e){var t,n;if(g(e)||"undefined"!=typeof Buffer&&e instanceof Buffer){var o=new Uint8Array(e);if(-1===(i=o.indexOf(I.RecordSeparatorCode)))throw new Error("Message is incomplete.");var r=i+1;t=String.fromCharCode.apply(null,o.slice(0,r)),n=o.byteLength>r?o.slice(r).buffer:null}else{var i,s=e;if(-1===(i=s.indexOf(I.RecordSeparator)))throw new Error("Message is incomplete.");t=s.substring(0,r=i+1),n=s.length>r?s.substring(r):null}var a=I.parse(t),c=JSON.parse(a[0]);if(c.type)throw new Error("Expected a handshake response from the server.");return[n,c]},e}(),_=function(e){return e[e.Invocation=1]="Invocation",e[e.StreamItem=2]="StreamItem",e[e.Completion=3]="Completion",e[e.StreamInvocation=4]="StreamInvocation",e[e.CancelInvocation=5]="CancelInvocation",e[e.Ping=6]="Ping",e[e.Close=7]="Close",e}({}),O=3e4,j=15e3,R=function(e){return e[e.Disconnected=0]="Disconnected",e[e.Connected=1]="Connected",e}({}),M=function(){function e(e,t,n){var o=this;h.isRequired(e,"connection"),h.isRequired(t,"logger"),h.isRequired(n,"protocol"),this.serverTimeoutInMilliseconds=O,this.keepAliveIntervalInMilliseconds=j,this.logger=t,this.protocol=n,this.connection=e,this.handshakeProtocol=new P,this.connection.onreceive=function(e){return o.processIncomingData(e)},this.connection.onclose=function(e){return o.connectionClosed(e)},this.callbacks={},this.methods={},this.closedCallbacks=[],this.id=0,this.receivedHandshakeResponse=!1,this.connectionState=R.Disconnected,this.cachedPingMessage=this.protocol.writeMessage({type:_.Ping})}return e.create=function(t,n,o){return new e(t,n,o)},Object.defineProperty(e.prototype,"state",{get:function(){return this.connectionState},enumerable:!0,configurable:!0}),e.prototype.start=function(){return Object(o.__awaiter)(this,void 0,void 0,(function(){var e,t,n=this;return Object(o.__generator)(this,(function(o){switch(o.label){case 0:return e={protocol:this.protocol.name,version:this.protocol.version},this.logger.log(u.Debug,"Starting HubConnection."),this.receivedHandshakeResponse=!1,t=new Promise((function(e,t){n.handshakeResolver=e,n.handshakeRejecter=t})),[4,this.connection.start(this.protocol.transferFormat)];case 1:return o.sent(),this.logger.log(u.Debug,"Sending handshake request."),[4,this.sendMessage(this.handshakeProtocol.writeHandshakeRequest(e))];case 2:return o.sent(),this.logger.log(u.Information,"Using HubProtocol '"+this.protocol.name+"'."),this.cleanupTimeout(),this.resetTimeoutPeriod(),this.resetKeepAliveInterval(),[4,t];case 3:return o.sent(),this.connectionState=R.Connected,[2]}}))}))},e.prototype.stop=function(){return this.logger.log(u.Debug,"Stopping HubConnection."),this.cleanupTimeout(),this.cleanupPingTimer(),this.connection.stop()},e.prototype.stream=function(e){for(var t=this,n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];var r,i=this.createStreamInvocation(e,n),s=new b;s.cancelCallback=function(){var e=t.createCancelInvocation(i.invocationId),n=t.protocol.writeMessage(e);return delete t.callbacks[i.invocationId],r.then((function(){return t.sendMessage(n)}))},this.callbacks[i.invocationId]=function(e,t){t?s.error(t):e&&(e.type===_.Completion?e.error?s.error(new Error(e.error)):s.complete():s.next(e.item))};var a=this.protocol.writeMessage(i);return r=this.sendMessage(a).catch((function(e){s.error(e),delete t.callbacks[i.invocationId]})),s},e.prototype.sendMessage=function(e){return this.resetKeepAliveInterval(),this.connection.send(e)},e.prototype.send=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var o=this.createInvocation(e,t,!0),r=this.protocol.writeMessage(o);return this.sendMessage(r)},e.prototype.invoke=function(e){for(var t=this,n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];var r=this.createInvocation(e,n,!1),i=new Promise((function(e,n){t.callbacks[r.invocationId]=function(t,o){o?n(o):t&&(t.type===_.Completion?t.error?n(new Error(t.error)):e(t.result):n(new Error("Unexpected message type: "+t.type)))};var o=t.protocol.writeMessage(r);t.sendMessage(o).catch((function(e){n(e),delete t.callbacks[r.invocationId]}))}));return i},e.prototype.on=function(e,t){e&&t&&(e=e.toLowerCase(),this.methods[e]||(this.methods[e]=[]),-1===this.methods[e].indexOf(t)&&this.methods[e].push(t))},e.prototype.off=function(e,t){if(e){e=e.toLowerCase();var n=this.methods[e];if(n)if(t){var o=n.indexOf(t);-1!==o&&(n.splice(o,1),0===n.length&&delete this.methods[e])}else delete this.methods[e]}},e.prototype.onclose=function(e){e&&this.closedCallbacks.push(e)},e.prototype.processIncomingData=function(e){if(this.cleanupTimeout(),this.receivedHandshakeResponse||(e=this.processHandshakeResponse(e),this.receivedHandshakeResponse=!0),e)for(var t=0,n=this.protocol.parseMessages(e,this.logger);t<n.length;t++){var o=n[t];switch(o.type){case _.Invocation:this.invokeClientMethod(o);break;case _.StreamItem:case _.Completion:var r=this.callbacks[o.invocationId];null!=r&&(o.type===_.Completion&&delete this.callbacks[o.invocationId],r(o));break;case _.Ping:break;case _.Close:this.logger.log(u.Information,"Close message received from server."),this.connection.stop(o.error?new Error("Server returned an error on close: "+o.error):void 0);break;default:this.logger.log(u.Warning,"Invalid message type: "+o.type+".")}}this.resetTimeoutPeriod()},e.prototype.processHandshakeResponse=function(e){var t,n,o;try{o=(t=this.handshakeProtocol.parseHandshakeResponse(e))[0],n=t[1]}catch(s){var r;this.logger.log(u.Error,r="Error parsing handshake response: "+s);var i=new Error(r);throw this.connection.stop(i),this.handshakeRejecter(i),i}if(n.error)throw this.logger.log(u.Error,r="Server returned handshake error: "+n.error),this.handshakeRejecter(r),this.connection.stop(new Error(r)),new Error(r);return this.logger.log(u.Debug,"Server handshake complete."),this.handshakeResolver(),o},e.prototype.resetKeepAliveInterval=function(){var e=this;this.cleanupPingTimer(),this.pingServerHandle=setTimeout((function(){return Object(o.__awaiter)(e,void 0,void 0,(function(){return Object(o.__generator)(this,(function(e){switch(e.label){case 0:if(this.connectionState!==R.Connected)return[3,4];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,this.sendMessage(this.cachedPingMessage)];case 2:return e.sent(),[3,4];case 3:return e.sent(),this.cleanupPingTimer(),[3,4];case 4:return[2]}}))}))}),this.keepAliveIntervalInMilliseconds)},e.prototype.resetTimeoutPeriod=function(){var e=this;this.connection.features&&this.connection.features.inherentKeepAlive||(this.timeoutHandle=setTimeout((function(){return e.serverTimeout()}),this.serverTimeoutInMilliseconds))},e.prototype.serverTimeout=function(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))},e.prototype.invokeClientMethod=function(e){var t=this,n=this.methods[e.target.toLowerCase()];if(n){if(n.forEach((function(n){return n.apply(t,e.arguments)})),e.invocationId){var o="Server requested a response, which is not supported in this version of the client.";this.logger.log(u.Error,o),this.connection.stop(new Error(o))}}else this.logger.log(u.Warning,"No client method with the name '"+e.target+"' found.")},e.prototype.connectionClosed=function(e){var t=this,n=this.callbacks;this.callbacks={},this.connectionState=R.Disconnected,this.handshakeRejecter&&this.handshakeRejecter(e),Object.keys(n).forEach((function(t){(0,n[t])(null,e||new Error("Invocation canceled due to connection being closed."))})),this.cleanupTimeout(),this.cleanupPingTimer(),this.closedCallbacks.forEach((function(n){return n.apply(t,[e])}))},e.prototype.cleanupPingTimer=function(){this.pingServerHandle&&clearTimeout(this.pingServerHandle)},e.prototype.cleanupTimeout=function(){this.timeoutHandle&&clearTimeout(this.timeoutHandle)},e.prototype.createInvocation=function(e,t,n){if(n)return{arguments:t,target:e,type:_.Invocation};var o=this.id;return this.id++,{arguments:t,invocationId:o.toString(),target:e,type:_.Invocation}},e.prototype.createStreamInvocation=function(e,t){var n=this.id;return this.id++,{arguments:t,invocationId:n.toString(),target:e,type:_.StreamInvocation}},e.prototype.createCancelInvocation=function(e){return{invocationId:e,type:_.CancelInvocation}},e}(),x=function(e){return e[e.None=0]="None",e[e.WebSockets=1]="WebSockets",e[e.ServerSentEvents=2]="ServerSentEvents",e[e.LongPolling=4]="LongPolling",e}({}),q=function(e){return e[e.Text=1]="Text",e[e.Binary=2]="Binary",e}({}),H=function(){function e(){this.isAborted=!1,this.onabort=null}return e.prototype.abort=function(){this.isAborted||(this.isAborted=!0,this.onabort&&this.onabort())},Object.defineProperty(e.prototype,"signal",{get:function(){return this},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"aborted",{get:function(){return this.isAborted},enumerable:!0,configurable:!0}),e}(),L=function(){function e(e,t,n,o){this.httpClient=e,this.accessTokenFactory=t,this.logger=n,this.pollAbort=new H,this.logMessageContent=o,this.running=!1,this.onreceive=null,this.onclose=null}return Object.defineProperty(e.prototype,"pollAborted",{get:function(){return this.pollAbort.aborted},enumerable:!0,configurable:!0}),e.prototype.connect=function(e,t){return Object(o.__awaiter)(this,void 0,void 0,(function(){var n,i,s,a;return Object(o.__generator)(this,(function(o){switch(o.label){case 0:if(h.isRequired(e,"url"),h.isRequired(t,"transferFormat"),h.isIn(t,q,"transferFormat"),this.url=e,this.logger.log(u.Trace,"(LongPolling transport) Connecting."),t===q.Binary&&"undefined"!=typeof XMLHttpRequest&&"string"!=typeof(new XMLHttpRequest).responseType)throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");return n={abortSignal:this.pollAbort.signal,headers:{},timeout:1e5},t===q.Binary&&(n.responseType="arraybuffer"),[4,this.getAccessToken()];case 1:return i=o.sent(),this.updateHeaderToken(n,i),s=e+"&_="+Date.now(),this.logger.log(u.Trace,"(LongPolling transport) polling: "+s+"."),[4,this.httpClient.get(s,n)];case 2:return 200!==(a=o.sent()).statusCode?(this.logger.log(u.Error,"(LongPolling transport) Unexpected response code: "+a.statusCode+"."),this.closeError=new r(a.statusText||"",a.statusCode),this.running=!1):this.running=!0,this.receiving=this.poll(this.url,n),[2]}}))}))},e.prototype.getAccessToken=function(){return Object(o.__awaiter)(this,void 0,void 0,(function(){return Object(o.__generator)(this,(function(e){switch(e.label){case 0:return this.accessTokenFactory?[4,this.accessTokenFactory()]:[3,2];case 1:return[2,e.sent()];case 2:return[2,null]}}))}))},e.prototype.updateHeaderToken=function(e,t){e.headers||(e.headers={}),t?e.headers.Authorization="Bearer "+t:e.headers.Authorization&&delete e.headers.Authorization},e.prototype.poll=function(e,t){return Object(o.__awaiter)(this,void 0,void 0,(function(){var n,s,a,c;return Object(o.__generator)(this,(function(o){switch(o.label){case 0:o.trys.push([0,,8,9]),o.label=1;case 1:return this.running?[4,this.getAccessToken()]:[3,7];case 2:n=o.sent(),this.updateHeaderToken(t,n),o.label=3;case 3:return o.trys.push([3,5,,6]),s=e+"&_="+Date.now(),this.logger.log(u.Trace,"(LongPolling transport) polling: "+s+"."),[4,this.httpClient.get(s,t)];case 4:return 204===(a=o.sent()).statusCode?(this.logger.log(u.Information,"(LongPolling transport) Poll terminated by server."),this.running=!1):200!==a.statusCode?(this.logger.log(u.Error,"(LongPolling transport) Unexpected response code: "+a.statusCode+"."),this.closeError=new r(a.statusText||"",a.statusCode),this.running=!1):a.content?(this.logger.log(u.Trace,"(LongPolling transport) data received. "+p(a.content,this.logMessageContent)+"."),this.onreceive&&this.onreceive(a.content)):this.logger.log(u.Trace,"(LongPolling transport) Poll timed out, reissuing."),[3,6];case 5:return c=o.sent(),this.running?c instanceof i?this.logger.log(u.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this.closeError=c,this.running=!1):this.logger.log(u.Trace,"(LongPolling transport) Poll errored after shutdown: "+c.message),[3,6];case 6:return[3,1];case 7:return[3,9];case 8:return this.logger.log(u.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this.raiseOnClose(),[7];case 9:return[2]}}))}))},e.prototype.send=function(e){return Object(o.__awaiter)(this,void 0,void 0,(function(){return Object(o.__generator)(this,(function(t){return this.running?[2,f(this.logger,"LongPolling",this.httpClient,this.url,this.accessTokenFactory,e,this.logMessageContent)]:[2,Promise.reject(new Error("Cannot send until the transport is connected"))]}))}))},e.prototype.stop=function(){return Object(o.__awaiter)(this,void 0,void 0,(function(){var e,t;return Object(o.__generator)(this,(function(n){switch(n.label){case 0:this.logger.log(u.Trace,"(LongPolling transport) Stopping polling."),this.running=!1,this.pollAbort.abort(),n.label=1;case 1:return n.trys.push([1,,5,6]),[4,this.receiving];case 2:return n.sent(),this.logger.log(u.Trace,"(LongPolling transport) sending DELETE request to "+this.url+"."),e={headers:{}},[4,this.getAccessToken()];case 3:return t=n.sent(),this.updateHeaderToken(e,t),[4,this.httpClient.delete(this.url,e)];case 4:return n.sent(),this.logger.log(u.Trace,"(LongPolling transport) DELETE request sent."),[3,6];case 5:return this.logger.log(u.Trace,"(LongPolling transport) Stop finished."),this.raiseOnClose(),[7];case 6:return[2]}}))}))},e.prototype.raiseOnClose=function(){if(this.onclose){var e="(LongPolling transport) Firing onclose event.";this.closeError&&(e+=" Error: "+this.closeError),this.logger.log(u.Trace,e),this.onclose(this.closeError)}},e}(),W=function(){function e(e,t,n,o,r){this.httpClient=e,this.accessTokenFactory=t,this.logger=n,this.logMessageContent=o,this.eventSourceConstructor=r,this.onreceive=null,this.onclose=null}return e.prototype.connect=function(e,t){return Object(o.__awaiter)(this,void 0,void 0,(function(){var n,r=this;return Object(o.__generator)(this,(function(o){switch(o.label){case 0:return h.isRequired(e,"url"),h.isRequired(t,"transferFormat"),h.isIn(t,q,"transferFormat"),this.logger.log(u.Trace,"(SSE transport) Connecting."),this.url=e,this.accessTokenFactory?[4,this.accessTokenFactory()]:[3,2];case 1:(n=o.sent())&&(e+=(e.indexOf("?")<0?"?":"&")+"access_token="+encodeURIComponent(n)),o.label=2;case 2:return[2,new Promise((function(n,o){var i=!1;if(t===q.Text){var s;if("undefined"!=typeof window)s=new r.eventSourceConstructor(e,{withCredentials:!0});else{var a=r.httpClient.getCookieString(e);s=new r.eventSourceConstructor(e,{withCredentials:!0,headers:{Cookie:a}})}try{s.onmessage=function(e){if(r.onreceive)try{r.logger.log(u.Trace,"(SSE transport) data received. "+p(e.data,r.logMessageContent)+"."),r.onreceive(e.data)}catch(t){return void r.close(t)}},s.onerror=function(e){var t=new Error(e.data||"Error occurred");i?r.close(t):o(t)},s.onopen=function(){r.logger.log(u.Information,"SSE connected to "+r.url),r.eventSource=s,i=!0,n()}}catch(c){return void o(c)}}else o(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"))}))]}}))}))},e.prototype.send=function(e){return Object(o.__awaiter)(this,void 0,void 0,(function(){return Object(o.__generator)(this,(function(t){return this.eventSource?[2,f(this.logger,"SSE",this.httpClient,this.url,this.accessTokenFactory,e,this.logMessageContent)]:[2,Promise.reject(new Error("Cannot send until the transport is connected"))]}))}))},e.prototype.stop=function(){return this.close(),Promise.resolve()},e.prototype.close=function(e){this.eventSource&&(this.eventSource.close(),this.eventSource=void 0,this.onclose&&this.onclose(e))},e}(),A=function(){function e(e,t,n,o,r){this.logger=n,this.accessTokenFactory=t,this.logMessageContent=o,this.webSocketConstructor=r,this.httpClient=e,this.onreceive=null,this.onclose=null}return e.prototype.connect=function(e,t){return Object(o.__awaiter)(this,void 0,void 0,(function(){var n,r=this;return Object(o.__generator)(this,(function(o){switch(o.label){case 0:return h.isRequired(e,"url"),h.isRequired(t,"transferFormat"),h.isIn(t,q,"transferFormat"),this.logger.log(u.Trace,"(WebSockets transport) Connecting."),this.accessTokenFactory?[4,this.accessTokenFactory()]:[3,2];case 1:(n=o.sent())&&(e+=(e.indexOf("?")<0?"?":"&")+"access_token="+encodeURIComponent(n)),o.label=2;case 2:return[2,new Promise((function(n,o){var i;e=e.replace(/^http/,"ws");var s=r.httpClient.getCookieString(e);"undefined"==typeof window&&s&&(i=new r.webSocketConstructor(e,void 0,{headers:{Cookie:""+s}})),i||(i=new r.webSocketConstructor(e)),t===q.Binary&&(i.binaryType="arraybuffer"),i.onopen=function(t){r.logger.log(u.Information,"WebSocket connected to "+e+"."),r.webSocket=i,n()},i.onerror=function(e){var t=null;"undefined"!=typeof ErrorEvent&&e instanceof ErrorEvent&&(t=e.error),o(t)},i.onmessage=function(e){r.logger.log(u.Trace,"(WebSockets transport) data received. "+p(e.data,r.logMessageContent)+"."),r.onreceive&&r.onreceive(e.data)},i.onclose=function(e){return r.close(e)}}))]}}))}))},e.prototype.send=function(e){return this.webSocket&&this.webSocket.readyState===this.webSocketConstructor.OPEN?(this.logger.log(u.Trace,"(WebSockets transport) sending data. "+p(e,this.logMessageContent)+"."),this.webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")},e.prototype.stop=function(){return this.webSocket&&(this.webSocket.onclose=function(){},this.webSocket.onmessage=function(){},this.webSocket.onerror=function(){},this.webSocket.close(),this.webSocket=void 0,this.close(void 0)),Promise.resolve()},e.prototype.close=function(e){this.logger.log(u.Trace,"(WebSockets transport) socket closed."),this.onclose&&(!e||!1!==e.wasClean&&1e3===e.code?this.onclose():this.onclose(new Error("WebSocket closed with status code: "+e.code+" ("+e.reason+").")))},e}(),D=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function s(e){try{c(o.next(e))}catch(t){i(t)}}function a(e){try{c(o.throw(e))}catch(t){i(t)}}function c(e){e.done?r(e.value):new n((function(t){t(e.value)})).then(s,a)}c((o=o.apply(e,t||[])).next())}))},F=function(e,t){var n,o,r,i,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,o=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(r=(r=s.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){s.label=i[1];break}if(6===i[0]&&s.label<r[1]){s.label=r[1],r=i;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(i);break}r[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(a){i=[6,a],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},N=null,U=null;if("undefined"==typeof window){var B=require;N=B("ws"),U=B("eventsource")}var J=function(){function e(e,t){var n;void 0===t&&(t={}),this.features={},h.isRequired(e,"url"),this.logger=void 0===(n=t.logger)?new w(u.Information):null===n?l.instance:n.log?n:new w(n),this.baseUrl=this.resolveUrl(e),(t=t||{}).logMessageContent=t.logMessageContent||!1;var o="undefined"==typeof window;o||"undefined"==typeof WebSocket||t.WebSocket?o&&!t.WebSocket&&N&&(t.WebSocket=N):t.WebSocket=WebSocket,o||"undefined"==typeof EventSource||t.EventSource?o&&!t.EventSource&&void 0!==U&&(t.EventSource=U):t.EventSource=EventSource,this.httpClient=t.httpClient||new E(this.logger),this.connectionState=2,this.options=t,this.onreceive=null,this.onclose=null}return e.prototype.start=function(e){return h.isIn(e=e||q.Binary,q,"transferFormat"),this.logger.log(u.Debug,"Starting connection with transfer format '"+q[e]+"'."),2!==this.connectionState?Promise.reject(new Error("Cannot start a connection that is not in the 'Disconnected' state.")):(this.connectionState=0,this.startPromise=this.startInternal(e),this.startPromise)},e.prototype.send=function(e){if(1!==this.connectionState)throw new Error("Cannot send data if the connection is not in the 'Connected' State.");return this.transport.send(e)},e.prototype.stop=function(e){return D(this,void 0,void 0,(function(){return F(this,(function(t){switch(t.label){case 0:this.connectionState=2,this.stopError=e,t.label=1;case 1:return t.trys.push([1,3,,4]),[4,this.startPromise];case 2:case 3:return t.sent(),[3,4];case 4:return this.transport?[4,this.transport.stop()]:[3,6];case 5:t.sent(),this.transport=void 0,t.label=6;case 6:return[2]}}))}))},e.prototype.startInternal=function(e){return D(this,void 0,void 0,(function(){var t,n,o,r,i,s,a,c=this;return F(this,(function(l){switch(l.label){case 0:t=this.baseUrl,this.accessTokenFactory=this.options.accessTokenFactory,l.label=1;case 1:return l.trys.push([1,12,,13]),this.options.skipNegotiation?this.options.transport!==x.WebSockets?[3,3]:(this.transport=this.constructTransport(x.WebSockets),[4,this.transport.connect(t,e)]):[3,5];case 2:return l.sent(),[3,4];case 3:throw Error("Negotiation can only be skipped when using the WebSocket transport directly.");case 4:return[3,11];case 5:n=null,o=0,r=function(){var e;return F(this,(function(r){switch(r.label){case 0:return[4,i.getNegotiationResponse(t)];case 1:if(n=r.sent(),2===i.connectionState)return[2,{value:void 0}];if(n.error)throw Error(n.error);if(n.ProtocolVersion)throw Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");return n.url&&(t=n.url),n.accessToken&&(e=n.accessToken,i.accessTokenFactory=function(){return e}),o++,[2]}}))},i=this,l.label=6;case 6:return[5,r()];case 7:if("object"==typeof(s=l.sent()))return[2,s.value];l.label=8;case 8:if(n.url&&o<100)return[3,6];l.label=9;case 9:if(100===o&&n.url)throw Error("Negotiate redirection limit exceeded.");return[4,this.createTransport(t,this.options.transport,n,e)];case 10:l.sent(),l.label=11;case 11:return this.transport instanceof L&&(this.features.inherentKeepAlive=!0),this.transport.onreceive=this.onreceive,this.transport.onclose=function(e){return c.stopConnection(e)},this.changeState(0,1),[3,13];case 12:throw a=l.sent(),this.logger.log(u.Error,"Failed to start the connection: "+a),this.connectionState=2,this.transport=void 0,a;case 13:return[2]}}))}))},e.prototype.getNegotiationResponse=function(e){return D(this,void 0,void 0,(function(){var t,n,o,r,i,s;return F(this,(function(a){switch(a.label){case 0:return this.accessTokenFactory?[4,this.accessTokenFactory()]:[3,2];case 1:(o=a.sent())&&((t={}).Authorization="Bearer "+o,n=t),a.label=2;case 2:r=this.resolveNegotiateUrl(e),this.logger.log(u.Debug,"Sending negotiation request: "+r+"."),a.label=3;case 3:return a.trys.push([3,5,,6]),[4,this.httpClient.post(r,{content:"",headers:n})];case 4:if(200!==(i=a.sent()).statusCode)throw Error("Unexpected status code returned from negotiate "+i.statusCode);return[2,JSON.parse(i.content)];case 5:throw s=a.sent(),this.logger.log(u.Error,"Failed to complete negotiation with the server: "+s),s;case 6:return[2]}}))}))},e.prototype.createConnectUrl=function(e,t){return t?e+(-1===e.indexOf("?")?"?":"&")+"id="+t:e},e.prototype.createTransport=function(e,t,n,o){return D(this,void 0,void 0,(function(){var r,i,s,a,c,l;return F(this,(function(h){switch(h.label){case 0:return r=this.createConnectUrl(e,n.connectionId),this.isITransport(t)?(this.logger.log(u.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,[4,this.transport.connect(r,o)]):[3,2];case 1:return h.sent(),this.changeState(0,1),[2];case 2:i=0,s=n.availableTransports||[],h.label=3;case 3:return i<s.length?(a=s[i],this.connectionState=0,"number"!=typeof(c=this.resolveTransport(a,t,o))?[3,8]:(this.transport=this.constructTransport(c),n.connectionId?[3,5]:[4,this.getNegotiationResponse(e)])):[3,9];case 4:n=h.sent(),r=this.createConnectUrl(e,n.connectionId),h.label=5;case 5:return h.trys.push([5,7,,8]),[4,this.transport.connect(r,o)];case 6:return h.sent(),this.changeState(0,1),[2];case 7:return l=h.sent(),this.logger.log(u.Error,"Failed to start the transport '"+x[c]+"': "+l),this.connectionState=2,n.connectionId=void 0,[3,8];case 8:return i++,[3,3];case 9:throw new Error("Unable to initialize any of the available transports.")}}))}))},e.prototype.constructTransport=function(e){switch(e){case x.WebSockets:if(!this.options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new A(this.httpClient,this.accessTokenFactory,this.logger,this.options.logMessageContent||!1,this.options.WebSocket);case x.ServerSentEvents:if(!this.options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new W(this.httpClient,this.accessTokenFactory,this.logger,this.options.logMessageContent||!1,this.options.EventSource);case x.LongPolling:return new L(this.httpClient,this.accessTokenFactory,this.logger,this.options.logMessageContent||!1);default:throw new Error("Unknown transport: "+e+".")}},e.prototype.resolveTransport=function(e,t,n){var o=x[e.transport];if(null==o)this.logger.log(u.Debug,"Skipping transport '"+e.transport+"' because it is not supported by this client.");else{var r=e.transferFormats.map((function(e){return q[e]}));if(function(e,t){return!e||0!=(t&e)}(t,o))if(r.indexOf(n)>=0){if((o!==x.WebSockets||this.options.WebSocket)&&(o!==x.ServerSentEvents||this.options.EventSource))return this.logger.log(u.Debug,"Selecting transport '"+x[o]+"'."),o;this.logger.log(u.Debug,"Skipping transport '"+x[o]+"' because it is not supported in your environment.'")}else this.logger.log(u.Debug,"Skipping transport '"+x[o]+"' because it does not support the requested transfer format '"+q[n]+"'.");else this.logger.log(u.Debug,"Skipping transport '"+x[o]+"' because it was disabled by the client.")}return null},e.prototype.isITransport=function(e){return e&&"object"==typeof e&&"connect"in e},e.prototype.changeState=function(e,t){return this.connectionState===e&&(this.connectionState=t,!0)},e.prototype.stopConnection=function(e){this.transport=void 0,(e=this.stopError||e)?this.logger.log(u.Error,"Connection disconnected with error '"+e+"'."):this.logger.log(u.Information,"Connection disconnected."),this.connectionState=2,this.onclose&&this.onclose(e)},e.prototype.resolveUrl=function(e){if(0===e.lastIndexOf("https://",0)||0===e.lastIndexOf("http://",0))return e;if("undefined"==typeof window||!window||!window.document)throw new Error("Cannot resolve '"+e+"'.");var t=window.document.createElement("a");return t.href=e,this.logger.log(u.Information,"Normalizing '"+e+"' to '"+t.href+"'."),t.href},e.prototype.resolveNegotiateUrl=function(e){var t=e.indexOf("?"),n=e.substring(0,-1===t?e.length:t);return"/"!==n[n.length-1]&&(n+="/"),(n+="negotiate")+(-1===t?"":e.substring(t))},e}(),X="json",z=function(){function e(){this.name=X,this.version=1,this.transferFormat=q.Text}return e.prototype.parseMessages=function(e,t){if("string"!=typeof e)throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];null===t&&(t=l.instance);for(var n=[],o=0,r=I.parse(e);o<r.length;o++){var i=JSON.parse(r[o]);if("number"!=typeof i.type)throw new Error("Invalid payload.");switch(i.type){case _.Invocation:this.isInvocationMessage(i);break;case _.StreamItem:this.isStreamItemMessage(i);break;case _.Completion:this.isCompletionMessage(i);break;case _.Ping:case _.Close:break;default:t.log(u.Information,"Unknown message type '"+i.type+"' ignored.");continue}n.push(i)}return n},e.prototype.writeMessage=function(e){return I.write(JSON.stringify(e))},e.prototype.isInvocationMessage=function(e){this.assertNotEmptyString(e.target,"Invalid payload for Invocation message."),void 0!==e.invocationId&&this.assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")},e.prototype.isStreamItemMessage=function(e){if(this.assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),void 0===e.item)throw new Error("Invalid payload for StreamItem message.")},e.prototype.isCompletionMessage=function(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this.assertNotEmptyString(e.error,"Invalid payload for Completion message."),this.assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")},e.prototype.assertNotEmptyString=function(e,t){if("string"!=typeof e||""===e)throw new Error(t)},e}(),G=function(){function e(){}return e.prototype.configureLogging=function(e){return h.isRequired(e,"logging"),this.logger=void 0!==e.log?e:new w(e),this},e.prototype.withUrl=function(e,t){return h.isRequired(e,"url"),this.url=e,this.httpConnectionOptions="object"==typeof t?t:{transport:t},this},e.prototype.withHubProtocol=function(e){return h.isRequired(e,"protocol"),this.protocol=e,this},e.prototype.build=function(){var e=this.httpConnectionOptions||{};if(void 0===e.logger&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");var t=new J(this.url,e);return M.create(t,this.logger||l.instance,this.protocol||new z)},e}(),K=n("+mlD"),V=n("CcnG");n.d(t,"a",(function(){return Q}));var Q=function(){function e(){var e=this;this.startConnection=function(t){e.hubConnection=(new G).withUrl(K.a.remoteServiceBaseUrl+"/signalr").build(),e.hubConnection.start().then((function(){e.send(t,"joinGroup")})).catch((function(e){return console.log("Error while starting connection: "+e)}))},this.send=function(t,n){e.hubConnection.send("newMessage",t,n).catch((function(e){return console.error(e)}))},this.onclose=function(){console.log("watchclosed"),e.hubConnection.onclose((function(e){console.log(e),setTimeout((function(){this.startConnection()}),3e3)}))}}return e.ngInjectableDef=V.Vb({factory:function(){return new e},token:e,providedIn:"root"}),e}()}}]);