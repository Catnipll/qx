/**
 京东小魔方 活动入口：京东app-新品首发-百万京豆
 活动好像是持续进行的，cron还是修改成每天运行就好了。
脚本更新地址：https://raw.githubusercontent.com/i-chenzhe/qx/master/jd_xmf.js

 已支持IOS双京东账号,Node.js支持N个京东账号
 脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
 // quantumultx
 [task_local]
 # 京东小魔方
 10 10 * * *   https://raw.githubusercontent.com/i-chenzhe/qx/master/jd_xmf.js, tag= 京东小魔方, enabled=true
 //Loon
 [Script]
 cron "  10 10 * * *   " script-path=https://raw.githubusercontent.com/i-chenzhe/qx/master/jd_xmf.js ,tag= 京东小魔方
 //Surge
  京东小魔方 = type=cron,cronexp="  10 10 * * *   ",wake-system=1,timeout=20,script-path=https://raw.githubusercontent.com/i-chenzhe/qx/master/jd_xmf.js
* */
const $ = new Env('京东小魔方');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
let helpAuthor = true;//为作者助力的开关
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = jsonParse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => item !== "" && item !== null && item !== undefined);
}
  var _0xodH='jsjiami.com.v6',_0x51aa=[_0xodH,'H2swwqgR','w7ZfUFQMcsO2','wpJIesKB','wpzDkwnDqcOp','w7zCrC4=','woUfGhxjLmQNwoA=','QiYZw5XorKHms6nlpKzotYLvvb3orKnmoIbmnajnv47otKvph4norI8=','woRsS8O4Qw==','YmhUwpEWwozCrw==','wpgCCx5jKGAO','5Lm45LmE5p6y5Ymr5Zif6L+E5Zqg56i35pSf5o6F','wrRjVALCrcOo','wpLCk8OIw7nDng==','wqcsw43Coxl3','6Kyh5Yud6ZqD5oaZ5ZyEMMOaw70lS+i+o+WFmuagpOS8j+aVsuWHg+WuiATluoborLbpgZnovbvoh57mnavlj5Toj4vljKDClcKeLjrCrSE=','w7XCigQ=','TcOrw41zNg==','ARzDvS7CohRywqQvRcKWXWADIiHDsApQwp3DvcKBZFQmwqbCocOpw6YjBMOjShdaw4YQOg==','wp5vCx/DhCsZw7zDvXjDjGM=','w6zDpFHChz/CqsO+wovCh8KXw4TCkMKhMMK+w4g6HsOIwrY6woDChUPDi8OUw4LDmMOgF0kuwrI=','fCk5w7fCkMObw7N6KiTCjMKedjsaH8Km','cDY1w7fCkcKaw7t2Oi0=','wqrCkcKuFyQ=','asO6w6oPJsOUw6fDhkDDlsKzdcK5w5vDlQ0Nw7EGw6vDn1Avw5pDC1/DoMOgRcO6VcOCw73CjGPDnQ==','CBjDuTLCuE08w78nWsKRXHhCPy4=','cyckw7fDj8OBwrgwLi3CjMKEPXoUF8KwwrdUwoBDw4nDgzBNDQo4w4DCjXXCo8KiwqHDk8KrwpsmwozCvcOiOwY=','w6JlwqdRYMKuwrvCjD8=','w5ZVw7bDjw==','wpHChsKG','w5TDqlfDsA==','44Oa5o+356Wj44KF6K2b5YWQ6I6q5Y2R5Lul5LqQ6LSX5Y2w5LifE8KxwqHCpGPDsB/nmZHmjaLkvoTnl4bDocO7DWbDhnbnm77ku57kupHnrozlioXoj4LljKg=','w7zDmnfDuMKa','wp48d0XDncKr','w79jw7/CtcK7w7PCk2U=','wpVuRMKwRg==','w4dxw67CpMKd','wrHCmyRhZQ==','w7huwpUqw6fCiiY=','GE55w4PCr0TDlwo=','wrMjfUzDgw==','EeW9k+Wmm+OCl+S4kOS7p+i2seWPqA==','wrnCl8OnETI=','UlIrwq/CjMOKw4rDmg==','wo00wrnDlsOEecKe','w5dHaQ==','wrZtXiI=','44CL5o6D56Wq44KWw5/ClMO4dCUt5bSf5aeb5pWb','w7nCrS3CicOa','ZXJ7wpU/woTCrMOn','wqpsB0PDp2Qew70=','Y+iun+mFhOaXrueaquW9u+iPquWNnURdwosHYkJqb8KmRlbCk8O+woBjHmLCoMOuw7jDri9Cw68AH1rCjQYrwpwXwropw7HCnsOnw7ctKDPDpmLDgg==','YcOwwpbDkMKgwqvDnQBnUgE9RGTCk2o6w6rDjE8vw5p+wpDDocKmw7Uaw5kMGMKaw44swoRQw5rCqUvDsjZgwrM=','wpZsLF7DjWA=','Gg3DpzrCn0Epw6IoTA==','w79bSVU=','wocowprDksOKdeW0guWlruaXjzTDmsKV','woRqw7BfHsKzw6fClQ==','5Lme5LmF6LS/5Y+V','w7Torbvph7fmlLrnm7LlvLfoja7ljpfCkMO2w4RwS8OV','QMO+w5s=','w7jDm0LCjwE=','cV95wooQ','NMOdC8O6Kw==','w53DmcO7','TcOewrDDucK2','w4B5w4zDj8Oh','d0gxwojCkA==','wopFQgNKNsKjwrjDs8KPw61hAMK5w4/Dh8OFwrPClcKYYhTCuBXCjmVQQWvCucOxw6HCvMKmw6XDuC3DpVBVw6wvwqnDnj9jZGIibcKkw7zDs8OfwrhowoNkZwTCssKfw78pwow7wqBVwqbDrjjDssOeHsOqw5AMwoIJdRoMw6tFw5DCjjhswprCsTxmSQFjXT3CrcKkw4HDhMOKw5YYFi8ww77DtMOBMwzDmSdew4nDscOqwqluw73Dr8OXw4JcHwxiw556TwdowpvCuiNcw5LDhcKdw5LDhjTDt8OSI1fDrMKQIcO/w7JHwqoVHcOZaMOSw5ttDEVGw5TCpk/DkHVqXMKxasOPbcOoCcOVw7dxNcKdGWN1TcK3w7LDvsKwwpDChwVCfcKCwq/CoCnCuwxAOlhDL8KAwoPDuENoKFvDhsOWL2lMJkfDpMOrw6PDqD56Q2LDjEbCqcO/OAAYw5PCoQ47W8O+w5vCvcKBwrjCu8OewqnCl8KcDcOkMXPCrjEMw43Cg8Ogw4MpdsO7O8OIw4p0a0DCpgrDjsOscMKLw6DDlXYBw4TCiMO2aMK/wp4sDmx/','wohVVwNJN8Olw4fDs8OVwq1pFcOqwoXDncKIw6zDg8KGNFvDqUvDmU9cTDPCjMOmw7/DoMO+wrjDhA/Dqkthw5MEw5XClylEVit/TcKCw5LCu8ONwqRHwpJUUETDlsOVwrghwpEKwpV9w6nDv2PCr8KJScO4w4Yxwrc8XQcewqwGw5jDkmwww4HCrTNTQg80Cj/Cr8K6w4vDmcOKw5EILS5+','w7PCr8Osw4TCscKdcHp+w7/DoMO7wp3CmcOdw6IrMQjCiF0mEDzDlxQ2w6HCsng=','w7bCsC/CtMOZ','Zj4tw6jDjSklwpDDvcOmMcOaWsKOwrRdw6DDvgwTZMKSw6B/w582w5zDvsO4w5PDqjAPFx7DnMKyGcO7aBRSUMKIwrsI','wq/CuAPCniXCrMOtwrHCj8KVw4/CncOjP8OrwpNvVcOBwrUkwoLDn2XDkcOXw5fClMK5SQFpwqUwwr9cw6d+w4pM','w4hlwoDDisOGYsKgNsOkNsONwpfDvMKOWcOrwpdeV8KHwprCi2PDpsOeUMOJwqjCn8K/csKCwqoWD8KQdnDCjXzDksOSOzTDjg==','cCoxw7jDnA==','woNPacOAVA==','wqbCnMKDMcOd','wpTDtllQHg==','wqvCgTJtc8KDJWRy','woYEGwE=','SmF8wpAb','woAmwoHDmA==','DgInw7vCosOD','wpgVUHHDvQ==','w6J4w7TDnsOL','BFw8wp0Gw7k=','wqZ3wqxDw7s=','w5lgw7bCrsKB','woUkwoHDisOqVA==','wqxmbcOiTQ==','w7zCmBfChw==','WMO3wqHCrQY=','w5/DsVI=','S8Ojw6YbAQ==','T08pwrDCt8OY','wrY9w57CpDZ9ETgBwp8=','wrcRDBtn','w5HCuS3CgsOI','wpDDusKya8O5','VcO7wqHCkCcTdntqw6Ftw6U=','wrXCpDdNVw==','woEKAQE=','Z3BbwpwZ','a8OhwoPDjsKSw7zCnVprQw==','wpfDhcKc','wrhDYcOz','w59Fwo8Vw6s=','5p+85q+Y5Yey6I+D5b+d','5Lqn5Li46LGn','wpPDv10=','w5RVYxE=','5b+h6YC/5oS3','w5bDpF0=','V8O1wrjCgQ==','C8K75aae6LS1fcKc5Yyh5Zmxw73Diw==','EE50w4nCjUnDgw==','w6JSS0AkaMOxwqh9fsKITw==','W148','w5XDucOxw7bDiw==','w5ZbaQ==','wqc5DMO5w7LDtsKhTMOg','w5V4woA9w4k=','S8OxwqbCkS4V','Gkh9','6IyG5Y2g5Lmn5Yid5Yqe6KOk5oqE5Yq0','ecO+VcO1wrs1YDTCr8KoA8O1','wpjDuTjDjcOpIw==','TcO1wqbCjxIOYENKw6Juw7k=','woY4aknDusKowpnDn8OhS1c=','Gw3DuivCvVo=','wojClMKSPsOjL8OOO3Q8FA==','wpfDok7Dr8O7A8K6NcKaw7bDhVJG','w6rCnBDCk8ONRA==','T8O6w5xfK8OSw67Do8KowpvDsFEYw4c=','CQ8/w4XCpg==','wo3DpFXDusOADMK/LsK/w7DDmG8=','LMOVbgE+wqI=','wpM6w5BoLsODTsKvwrPDigZj','w5ZbaTE1w6M=','wpAmwobDksOvecKDKw==','wqHCucO+w5bDhcOJ','FgY6w7fChcOAaC4fwrjCqQ==','wp9lwobDksOWMsOKfQ==','esOvwpfDqcK3','w7Z0wp3CoxlkGz8OwogcQMOIwprDkAwPfA==','ZMOxUsO7wpk7bCzCj8KpC8OTHA==','w5bClMKPWcOewqDDpWLChMKewq7DlcOyw7A=','wo7Dl8KIU8O9wqTDmmHCosKW','woYyw67CpsKGw7nCqnnCjmlKwrzCv2M=','wprCj8K4G8O3','S1ohwrA=','w5Eyw7PCqcKBw7fCjGHCnXgBw6nDpVfDuMKKw5U=','aMKeCsOhIVxXV0YF','wpNJTANzaQ==','w5M9FlDDmm4jw7fCvHfDqmpMwrk=','worDrUnDocOZDcK2LcK6w7fDjXQ=','wpcKw5VqBQ==','UMO6w4Zk','TcO1wqbCjxEVblt2w78=','wohAUDxNY8KawprDtMKQw6Z2T8O5','YMO8w7EIJsKLwpzCgEzDgw==','TsOwHMK+IsORYcKCccOx','cj0kw6LDjsKaw7RrJSfCg8Kjdw==','AMKgB8KoIsOfZcKEc8O4EsOew5LCog==','fcOlwpHDi8KDw77CnUNMWQY8','w4HCrW1PGUR1I8K8wrQ=','w4wDVxJJZsKewpHDq8KFwqE+','w6zCmBDCjcOoVA==','w53Drk4=','wpbDmcKc','ERM7w7XCuMOMdAEI','wqZDfsOlSQ==','BFYmwo4Xw6Mxwq/DmXZ5wrE=','wpNwFkXDjHcKw5bCpnY=','eX5rwosdwpE=','wqzCmiF3aQ==','wr99YxPCmA==','dzwkw7PDmcKJw65WIi7Cgg==','wodEVz1fesKGwofDr8KUw6Z2QsOJwo/ClcKE','wq7DusOkw5PDuMOIJHdzw6zCtMKywp/CscONw703','w4N+w67CosKHw7PCnXTCl2MGw4/Drw==','wrkew6VIFg==','wpoEDw==','w49iw6jDvQ==','wpNVURpUasKjwo7Dog==','Glwhwo8ew6U=','asOvw60wIsKAwpjCm07DlsK/KcK/wpA=','wqFVTitR','aTYjw7LDkMKP','wrzClsO3AC/CuxXCnQXClsOp','wrnDlmFm','UFQv','w7zDoUDChSLCoMOrwoY=','5LuY5Lu16LGf','woI3w552JsOAR8K1wpHDlw==','wrrDgWR1Dw==','wqRHf8OjQAY=','wobDsz/DjMOgJTTCjDlICg==','wo3CgMKAO8OELcOPCw==','wpDCmsKG','6I2i5b2Pwq0=','ci4ww77DlTQ=','QMOtB8K9NMOGTMKicsOyNA==','wpE0wpTDnsOGRMKYLcOiZ8Kfw5rCssKX','bCQ3w7/DnDIzwrfDmsOkYw==','w4Z/w67Cs8KQw6DCh0nCkGoH','w4Rxw7fCog==','woQOGwBhPQ==','MiTCscO/wp1u','woo2w55oF8KWQcKQwpfDjBtyD8KICMOfVgTCtsO+w4rDonM+w6bDsMKKM8K9wpjCjsOWI8K4w6/Dv8K0w7oQwrzCvcK4Z8OHwoPDsQY5wpPDuGLCvsO0Fw3DnEcAw5AFw79/wpZWGGHDkcOQf8KWwoXCnsKWwrYCJMKuw7M7PF9KwoRxw7h5w6zCtkbCp8KOCsKcw47CgAk6wr/DtlHDgsOTw6zDmcKWw4jCk8OgVcKTfXLDhTZlW8KsBcK/cC3Cn0xbw49sw7A7w7c5wqkNwpTDu0ojwqrCoWDClnLCrkPDnMKMw6ktw53Dg8Kqw5DCoEzCq8KzwpRzHwJ+wq4vwozDmcOcwoLDpR8AQ1XDnBTDjTMvw6xeMMK0MGoDw5DDscOvw55nH8OXwpgYTTAPw7HCq8KJwqFNWMK0wqjCu04Qwok/SDRKw5LClBrDtxd2w7wrHMKdE8OtGFUtbMKUQA9vw7JRw6jCmsKaQ8K7I0tPw7sowowywr0Mw7jCsgopbyrCum5dwqhESMKpXzIOKADDv3TDtjh3wrliwrvDn8O+w67Ds3/DvcO0KEbDucKMMcKRVk09UHdmw6LDlnHDg1s7w7JMw5rCrl7DmCfCmcKcw4bCqErCk8KXWkNrYHMCwqbDj8OGIcOVwqHDu8OhwrHClSM0wqXCliLCisKLfWzDh8OdXsKFccOHwppawqzCoMOiTC93S8OkOMKJdMKbS8KFYFQdw5PDohnDjcOVDsKfwp97w7w8GsOHw5A1ADs9JyfCiwrDjn8=','cXM1wp0f','w5LCtndUZQt+KsKTwrzCjsKMwo7DhCTClcO1','wpLDgsKPSMOew7HCmiLCisKCwo7Cn8K9w6TCnMKgworCnG3CpMOpflg8w7Y1bFIRZcOjwosSZcOXSivDlcOQw6NCVcKMw5DDo8Kk','wr5dw6XDmsODIXAIwrhkwqphwoTCtsOewrJ9PMKNw7ZZPz5ww44rw4vDg2QKwq7CuzzDsFQ7wpoTw7Ipbh1cOcKKw5wcXSZuw5TCq8KqWlfDpsOLM8OB','wpTCgcKVJcODfsKUXXJvVcKiw5Now5FxLRzClA==','w77Ch0ZrJg==','w7VpaF4A','w6bChlFWOA==','wpJKYMKySQ==','wr0pckTDig==','w53CuGpUOhE1YMKdw6XDgcKVw4XCgmDDmcOkwrcawpZ5w6ATQsOEYhtkw43CtMOWSsKrwownFF4SNnPCmkpBwpLCgVoOwqNDwpXDqT7DmHB5woHCiSTCk8OeBMKdS8Owwrd3IALCpW/DtWjDlw==','wpJEVxBVacKv','P8OAbRg7wrXDn8KZV8KYwo/DuCpjwr3CoUttJsKmw7I2wr/DpnDDtsKOCMOowqLDkxjCmQ==','wrfCg8OqBGbDqQjCsQ3CnMOnDMO0Fy1gAg==','w4F1w7/Ct8OYw7PCkmnCiGk=','wrTDiG/Diw==','wrLCkSF0bcOfJVJjBcKEBHTCmVFtw7pRwpXDocKewqvDpwJkKzvDuMOlEcOcw4skSTpuwq8vwrQjw5bCkcOnwpnCmnrCkTk7wpnCn8K5wrDDlcKbXcKnw5vDkcOYcMOZasKHNsKeNMODasKiwq3Cm8ODA1k4Gg==','Bw/DgSTCow==','wpTCgcKVJcODfsKUXW0rCMOhwpdmwps8IR7DliLDtH/DrcKUwoPDuMOXE1rDq1bDuHR+AjBbw4PCsR9mNMOqJsKMwrDDqwdB','w7FPw5vDhcOOIA==','wqDDmBTDrcOWEh/CmhZpIDvCuQ==','woVPVQ==','URcPw5LDr8K+w4VADQ/CqMKkRw==','woQ/w4/ClMKww4DCoUHCuUkmw5LDmA==','w79Dw5/ClcKqw5PCuUXCsFg=','w79Zw6HDjsOLMSw=','jsBjiCamqRJGbi.DdcMokmJA.v6Y=='];(function(_0xb67384,_0x27295a,_0x156d7c){var _0x52a1f8=function(_0x4f55ef,_0x225f21,_0xe9e21,_0x5db68b,_0x1405a3){_0x225f21=_0x225f21>>0x8,_0x1405a3='po';var _0x172f59='shift',_0x5489f2='push';if(_0x225f21<_0x4f55ef){while(--_0x4f55ef){_0x5db68b=_0xb67384[_0x172f59]();if(_0x225f21===_0x4f55ef){_0x225f21=_0x5db68b;_0xe9e21=_0xb67384[_0x1405a3+'p']();}else if(_0x225f21&&_0xe9e21['replace'](/[BCqRJGbDdMkJAY=]/g,'')===_0x225f21){_0xb67384[_0x5489f2](_0x5db68b);}}_0xb67384[_0x5489f2](_0xb67384[_0x172f59]());}return 0x7603a;};return _0x52a1f8(++_0x27295a,_0x156d7c)>>_0x27295a^_0x156d7c;}(_0x51aa,0xfd,0xfd00));var _0x4ffd=function(_0x43ac42,_0x5568ff){_0x43ac42=~~'0x'['concat'](_0x43ac42);var _0x4d01e3=_0x51aa[_0x43ac42];if(_0x4ffd['kugLCT']===undefined){(function(){var _0x1001a0=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x3576e8='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1001a0['atob']||(_0x1001a0['atob']=function(_0x402290){var _0x289941=String(_0x402290)['replace'](/=+$/,'');for(var _0x1066ce=0x0,_0x28a324,_0x391a49,_0x28d125=0x0,_0x4dd325='';_0x391a49=_0x289941['charAt'](_0x28d125++);~_0x391a49&&(_0x28a324=_0x1066ce%0x4?_0x28a324*0x40+_0x391a49:_0x391a49,_0x1066ce++%0x4)?_0x4dd325+=String['fromCharCode'](0xff&_0x28a324>>(-0x2*_0x1066ce&0x6)):0x0){_0x391a49=_0x3576e8['indexOf'](_0x391a49);}return _0x4dd325;});}());var _0x253aeb=function(_0x3bc9bb,_0x5568ff){var _0x314407=[],_0x204b50=0x0,_0x4e6d2c,_0x449535='',_0x4461d0='';_0x3bc9bb=atob(_0x3bc9bb);for(var _0x1348d6=0x0,_0x18d100=_0x3bc9bb['length'];_0x1348d6<_0x18d100;_0x1348d6++){_0x4461d0+='%'+('00'+_0x3bc9bb['charCodeAt'](_0x1348d6)['toString'](0x10))['slice'](-0x2);}_0x3bc9bb=decodeURIComponent(_0x4461d0);for(var _0x3b5089=0x0;_0x3b5089<0x100;_0x3b5089++){_0x314407[_0x3b5089]=_0x3b5089;}for(_0x3b5089=0x0;_0x3b5089<0x100;_0x3b5089++){_0x204b50=(_0x204b50+_0x314407[_0x3b5089]+_0x5568ff['charCodeAt'](_0x3b5089%_0x5568ff['length']))%0x100;_0x4e6d2c=_0x314407[_0x3b5089];_0x314407[_0x3b5089]=_0x314407[_0x204b50];_0x314407[_0x204b50]=_0x4e6d2c;}_0x3b5089=0x0;_0x204b50=0x0;for(var _0x38b4ee=0x0;_0x38b4ee<_0x3bc9bb['length'];_0x38b4ee++){_0x3b5089=(_0x3b5089+0x1)%0x100;_0x204b50=(_0x204b50+_0x314407[_0x3b5089])%0x100;_0x4e6d2c=_0x314407[_0x3b5089];_0x314407[_0x3b5089]=_0x314407[_0x204b50];_0x314407[_0x204b50]=_0x4e6d2c;_0x449535+=String['fromCharCode'](_0x3bc9bb['charCodeAt'](_0x38b4ee)^_0x314407[(_0x314407[_0x3b5089]+_0x314407[_0x204b50])%0x100]);}return _0x449535;};_0x4ffd['fauNGB']=_0x253aeb;_0x4ffd['zzFFOd']={};_0x4ffd['kugLCT']=!![];}var _0x25b2af=_0x4ffd['zzFFOd'][_0x43ac42];if(_0x25b2af===undefined){if(_0x4ffd['XfAgQk']===undefined){_0x4ffd['XfAgQk']=!![];}_0x4d01e3=_0x4ffd['fauNGB'](_0x4d01e3,_0x5568ff);_0x4ffd['zzFFOd'][_0x43ac42]=_0x4d01e3;}else{_0x4d01e3=_0x25b2af;}return _0x4d01e3;};!(async()=>{var _0x43d77d={'uOcdW':_0x4ffd('0','Kk[2'),'DZRYe':_0x4ffd('1','Y[i4'),'EmWsp':_0x4ffd('2','SxQd'),'rhkmM':'https://h5.m.jd.com','XEYeK':_0x4ffd('3','wk8i'),'KsyLR':_0x4ffd('4','wk8i'),'nILRx':_0x4ffd('5','2(5z'),'Zibdm':_0x4ffd('6','ELEH'),'CAUSI':_0x4ffd('7','Kk[2'),'FQMmC':_0x4ffd('8','wk8i'),'MbkpL':function(_0xc38470,_0x430776){return _0xc38470(_0x430776);},'asdJv':function(_0x442a7e,_0x4bfc63){return _0x442a7e+_0x4bfc63;},'Azdnj':function(_0x5d848a){return _0x5d848a();},'ozYjK':function(_0x22ea75,_0xcaf5bb){return _0x22ea75!==_0xcaf5bb;},'jLIST':function(_0x2e4f33,_0x1f594b){return _0x2e4f33<_0x1f594b;},'GoGfd':_0x4ffd('9','vPu]'),'ImxdT':function(_0x14e0b8,_0x5a420e){return _0x14e0b8===_0x5a420e;},'mQwIJ':function(_0xe964b1){return _0xe964b1();},'lkCbh':function(_0x36b0b2,_0x171648){return _0x36b0b2!==_0x171648;},'NXVPk':_0x4ffd('a','v7tE')};if(!cookiesArr[0x0]){$[_0x4ffd('b','Q*CP')]($[_0x4ffd('c','OI)z')],_0x4ffd('d','vLlB'),_0x43d77d['FQMmC'],{'open-url':_0x43d77d[_0x4ffd('e','OI)z')]});return;}for(let _0x5ba6d1=0x0;_0x5ba6d1<cookiesArr[_0x4ffd('f','aZ$R')];_0x5ba6d1++){if(cookiesArr[_0x5ba6d1]){cookie=cookiesArr[_0x5ba6d1];$[_0x4ffd('10','g@Vb')]=_0x43d77d[_0x4ffd('11','xXqC')](decodeURIComponent,cookie[_0x4ffd('12','g@Vb')](/pt_pin=(.+?);/)&&cookie['match'](/pt_pin=(.+?);/)[0x1]);$[_0x4ffd('13','H!sL')]=_0x43d77d['asdJv'](_0x5ba6d1,0x1);$[_0x4ffd('14','L%RN')]=!![];$[_0x4ffd('15','kVYW')]='';await _0x43d77d[_0x4ffd('16','aZ$R')](TotalBean);console['log'](_0x4ffd('17','wk8i')+$[_0x4ffd('18','2(5z')]+'】'+($[_0x4ffd('19','%YRo')]||$['UserName'])+'\x0a');if(!$[_0x4ffd('1a','U@Zy')]){$[_0x4ffd('1b','b[N%')]($[_0x4ffd('1c','vnuk')],_0x4ffd('1d','wk8i'),'京东账号'+$[_0x4ffd('1e',')HlX')]+'\x20'+($[_0x4ffd('1f','$e@v')]||$[_0x4ffd('20','Y[i4')])+_0x4ffd('21','Kk[2'),{'open-url':_0x4ffd('22','3ZxJ')});if($[_0x4ffd('23','Y[i4')]()){await notify[_0x4ffd('24','Kk[2')]($[_0x4ffd('25','ly5G')]+_0x4ffd('26','U@Zy')+$[_0x4ffd('27','vPu]')],_0x4ffd('28','aZ$R')+$['index']+'\x20'+$['UserName']+_0x4ffd('29','aL#2'));}continue;}if(helpAuthor){function _0x45d703(){return new Promise(_0x133e85=>{$[_0x4ffd('2a','AB[F')]({'url':_0x43d77d[_0x4ffd('2b','SxQd')]},(_0xcaedc3,_0x352022,_0x385808)=>{try{if(_0x385808){$[_0x4ffd('2c','$e@v')]=JSON[_0x4ffd('2d','z$JK')](_0x385808);};}catch(_0x3b359f){console[_0x4ffd('2e','A#76')](_0x3b359f);}finally{_0x133e85();};});});}function _0x14a04a(_0x3fd061,_0xadf91c){var _0x561309={'RTPmw':function(_0x5a494c){return _0x5a494c();}};let _0x2e3bc4={'url':'https://api.m.jd.com/client.action','headers':{'Host':_0x43d77d[_0x4ffd('2f','3ZxJ')],'Content-Type':_0x43d77d['EmWsp'],'Origin':_0x43d77d['rhkmM'],'Accept-Encoding':_0x43d77d[_0x4ffd('30','v7tE')],'Cookie':cookie,'Connection':_0x43d77d[_0x4ffd('31','%YRo')],'Accept':'application/json,\x20text/plain,\x20*/*','User-Agent':_0x4ffd('32','Qh&r'),'Referer':_0x4ffd('33','Qh&r')+_0x3fd061+_0x4ffd('34','^sqj'),'Accept-Language':_0x43d77d[_0x4ffd('35','7Ww5')]},'body':_0x4ffd('36','^uIH')+_0x3fd061+_0x4ffd('37','SxQd')+_0xadf91c+_0x4ffd('38','U@Zy')};return new Promise(_0x47f6e7=>{var _0xc5bbd0={'UmeVx':function(_0x51a686){return _0x561309['RTPmw'](_0x51a686);}};$['post'](_0x2e3bc4,(_0x5dd72b,_0x5b38ad,_0x1c6e20)=>{if(_0x1c6e20){$['zRes']=JSON[_0x4ffd('39','^uIH')](_0x1c6e20);_0xc5bbd0[_0x4ffd('3a','QNZG')](_0x47f6e7);};});});}function _0xc3d106(_0x11cc63,_0x20dfa3){let _0x1e8f42={'url':_0x43d77d[_0x4ffd('3b','Q*CP')],'headers':{'Content-Type':_0x43d77d[_0x4ffd('3c','@$t8')]},'body':JSON[_0x4ffd('3d','H!sL')]({'actID':_0x11cc63,'actsID':_0x20dfa3,'done':0x1})};return new Promise(_0x1ec739=>{$[_0x4ffd('3e','2wJq')](_0x1e8f42,(_0x1a6cc7,_0x2861f5,_0x419525)=>{_0x1ec739();});});}await _0x43d77d[_0x4ffd('3f','$e@v')](_0x45d703);if(_0x43d77d['ozYjK']($['zData'][_0x4ffd('40','U@Zy')][_0x4ffd('41','eBiI')],0x0)){for(let _0x5ba6d1=0x0;_0x43d77d[_0x4ffd('42','aZ$R')](_0x5ba6d1,$[_0x4ffd('43','v7tE')]['data'][_0x4ffd('44','c)%[')]);_0x5ba6d1++){var _0x2f0f78=_0x43d77d[_0x4ffd('45','hq&N')][_0x4ffd('46','g@Vb')]('|'),_0xe36d38=0x0;while(!![]){switch(_0x2f0f78[_0xe36d38++]){case'0':await _0x14a04a(actID,actsID);continue;case'1':await $['wait'](0x5dc);continue;case'2':actsID=$['zData']['data'][_0x5ba6d1][_0x4ffd('47','U@Zy')];continue;case'3':actID=$[_0x4ffd('48','QNZG')][_0x4ffd('49','7Ww5')][_0x5ba6d1][_0x4ffd('4a','L$1b')];continue;case'4':if($[_0x4ffd('4b','SxQd')]&&_0x43d77d[_0x4ffd('4c','ELEH')]($['Res'][_0x4ffd('4d','%YRo')],0x4)){await _0xc3d106(actID,actsID);}continue;}break;}};};};$[_0x4ffd('4e','NO&#')]=0x0;await _0x43d77d[_0x4ffd('4f','2wJq')](getTask);await _0x43d77d[_0x4ffd('50',')HlX')](task);for(let _0x5ba6d1=0x0;_0x43d77d[_0x4ffd('51','KqLV')](_0x5ba6d1,$[_0x4ffd('52','L$1b')]);_0x5ba6d1++){await _0x43d77d[_0x4ffd('53','H!sL')](lottery);await $[_0x4ffd('54','2wJq')](0x3e8);}if(_0x43d77d[_0x4ffd('55','$e@v')]($[_0x4ffd('56','3ZxJ')],0x0)){$[_0x4ffd('57','KqLV')]($[_0x4ffd('58','QNZG')],_0x43d77d[_0x4ffd('59','L%RN')],_0x4ffd('5a','2(5z')+$['beanAmount']+_0x4ffd('5b','SxQd'));}else{$[_0x4ffd('5c','aL#2')]($[_0x4ffd('5d','b[N%')],_0x4ffd('5e','Kk[2'),'大奖一闪而过，啥也没捞着。');}}}})()['catch'](_0x3fb135=>{$[_0x4ffd('5f','OI)z')]('','❌\x20'+$[_0x4ffd('60','L$1b')]+_0x4ffd('61','AB[F')+_0x3fb135+'!','');})[_0x4ffd('62','kVYW')](()=>{$['done']();});function getTask(){var _0x36417a={'DeYxI':function(_0xe8b564,_0x3bcf25){return _0xe8b564===_0x3bcf25;},'khvYp':_0x4ffd('63','ly5G'),'dOmJB':function(_0x5e8567,_0xa187d7,_0x415fcc){return _0x5e8567(_0xa187d7,_0x415fcc);},'qWDbD':'getInteractionInfo'};let _0x621735='{}';return new Promise(_0x5489a8=>{$[_0x4ffd('64','%YRo')](_0x36417a[_0x4ffd('65','A#76')](taskUrl,_0x36417a['qWDbD'],_0x621735),(_0x3b8825,_0x1af8e4,_0x50a5ed)=>{try{if(_0x3b8825){console[_0x4ffd('66','b[N%')]('err:'+JSON[_0x4ffd('67','yO!#')](_0x3b8825));}else{_0x50a5ed=JSON['parse'](_0x50a5ed);if(_0x36417a[_0x4ffd('68','L%RN')](_0x50a5ed[_0x4ffd('69','L$1b')]['code'],0x0)){console[_0x4ffd('6a','kVYW')](_0x4ffd('6b','A#76'));$[_0x4ffd('6c','LjlJ')]=_0x50a5ed[_0x4ffd('6d','3XvN')][_0x4ffd('6e','L$1b')];$[_0x4ffd('6f','aZ$R')]=_0x50a5ed[_0x4ffd('70','Kk[2')][_0x4ffd('71','Q*CP')];$[_0x4ffd('72','aL#2')]=_0x50a5ed['result']['interactionId'];}if(_0x50a5ed[_0x4ffd('73','7Ww5')][_0x4ffd('74','AB[F')](_0x36417a[_0x4ffd('75','eBiI')])){$[_0x4ffd('76','aL#2')]=_0x50a5ed[_0x4ffd('77','OcET')][_0x4ffd('78','lW3b')];}}}catch(_0x17d0ae){$[_0x4ffd('79','b[N%')](_0x17d0ae);}finally{_0x5489a8();}});});}async function task(){var _0x243da6={'YVNcu':function(_0x4809d6,_0x302387){return _0x4809d6===_0x302387;},'fzYNG':function(_0x197848,_0xd31281){return _0x197848(_0xd31281);},'wXjrb':function(_0x35eacc,_0x1b67d9){return _0x35eacc(_0x1b67d9);}};for(let _0x2f37ef of $['taskPoolInfo'][_0x4ffd('7a','U@Zy')]){switch(_0x2f37ef[_0x4ffd('7b','^sqj')]){case 0x4:for(let _0x135b66 of $[_0x4ffd('7c','eBiI')]){if(_0x243da6['YVNcu'](_0x135b66['browseStatus'],0x0)){let _0x1da349=_0x4ffd('7d','U@Zy')+_0x135b66[_0x4ffd('7e','3ZxJ')]+_0x4ffd('7f','NO&#')+$[_0x4ffd('80','LjlJ')]+_0x4ffd('81','KqLV')+$['taskPoolInfo'][_0x4ffd('82','KqLV')]+_0x4ffd('83','g@Vb');await _0x243da6[_0x4ffd('84','Q*CP')](doTask,_0x1da349);await $[_0x4ffd('85','%YRo')](0xbb8);}}break;case 0x7:for(let _0x422279 of $['shopInfoList']){let _0x1da349=_0x4ffd('86','g@Vb')+$['interactionId']+_0x4ffd('87','z$JK')+_0x422279[_0x4ffd('88','Qh&r')]+_0x4ffd('89','Y[i4')+$[_0x4ffd('8a','aL#2')]['taskPoolId']+',\x22taskType\x22:'+_0x2f37ef['taskId']+'}';await _0x243da6[_0x4ffd('8b','lW3b')](doTask,_0x1da349);await $[_0x4ffd('8c','AB[F')](0xbb8);}break;default:if(_0x243da6['YVNcu'](_0x2f37ef[_0x4ffd('8d','L$1b')],0x0)){if(_0x2f37ef[_0x4ffd('8e','Qh&r')](_0x4ffd('8f','ELEH'))){await $['wait'](_0x2f37ef[_0x4ffd('90','w1n(')]*0x3e8);}else{await $['wait'](0xbb8);}let _0x2b36c6=_0x4ffd('86','g@Vb')+$[_0x4ffd('91','wk8i')]+_0x4ffd('92','w1n(')+$[_0x4ffd('93','3ZxJ')][_0x4ffd('94','x]CT')]+_0x4ffd('95','Qh&r')+_0x2f37ef[_0x4ffd('96','7Ww5')]+'}';await doTask(_0x2b36c6);}break;}}}function doTask(_0x16db28){var _0x4562f9={'gqPTG':function(_0x392005){return _0x392005();},'omSPi':function(_0x90b9ff,_0x2e2b97,_0x30973d){return _0x90b9ff(_0x2e2b97,_0x30973d);},'RNoGU':'executeNewInteractionTask'};return new Promise(_0x4dee4a=>{$[_0x4ffd('97','OI)z')](_0x4562f9['omSPi'](taskUrl,_0x4562f9['RNoGU'],_0x16db28),(_0x52aa08,_0x225edb,_0x1d1742)=>{try{if(_0x52aa08){console[_0x4ffd('98','KqLV')](''+JSON[_0x4ffd('99','eBiI')](_0x52aa08));}else{_0x1d1742=JSON[_0x4ffd('9a','QNZG')](_0x1d1742);$[_0x4ffd('9b','c)%[')]=_0x1d1742['result'][_0x4ffd('9c','Y[i4')];console['log'](_0x1d1742[_0x4ffd('9d','$e@v')][_0x4ffd('9e','H!sL')]);}}catch(_0x250a8d){$['logErr'](_0x250a8d);}finally{_0x4562f9[_0x4ffd('9f','vnuk')](_0x4dee4a);}});});}function lottery(){var _0x49eb2f={'xZQcN':_0x4ffd('a0','wk8i'),'AtmXk':function(_0x90e4b7,_0x14b4da){return _0x90e4b7===_0x14b4da;},'mvhvX':function(_0x1d675d,_0x4e0b47){return _0x1d675d(_0x4e0b47);},'YLZPq':_0x4ffd('a1','Qh&r')};let _0x162a4c=_0x4ffd('a2','^sqj')+$[_0x4ffd('a3','g@Vb')]+'}';return new Promise(_0x5f432a=>{$['get'](taskUrl(_0x49eb2f[_0x4ffd('a4','lW3b')],_0x162a4c),(_0x3a64a0,_0x5848ce,_0x29e68f)=>{try{if(_0x3a64a0){console[_0x4ffd('a5','2wJq')](_0x4ffd('a6','g@Vb')+JSON[_0x4ffd('a7','Qh&r')](_0x3a64a0));}else{_0x29e68f=JSON['parse'](_0x29e68f);if(_0x29e68f[_0x4ffd('a8','c)%[')][_0x4ffd('a9','ELEH')](_0x49eb2f['xZQcN'])){if(_0x49eb2f[_0x4ffd('aa','Qh&r')](_0x29e68f[_0x4ffd('ab','wk8i')][_0x4ffd('ac','2(5z')][_0x4ffd('ad','@$t8')],'京豆')){console[_0x4ffd('ae','%YRo')]('获得'+_0x29e68f['result']['lotteryInfo'][_0x4ffd('af','SxQd')]+_0x4ffd('b0','aZ$R'));$[_0x4ffd('b1','lW3b')]+=_0x49eb2f[_0x4ffd('b2','@$t8')](parseInt,_0x29e68f[_0x4ffd('b3','QNZG')][_0x4ffd('b4','3XvN')][_0x4ffd('b5','Q*CP')]);}else{console[_0x4ffd('b6','Q*CP')](_0x4ffd('b7','^sqj')+_0x29e68f[_0x4ffd('b8','^uIH')][_0x4ffd('b9','w1n(')][_0x4ffd('ba','U@Zy')]+'-'+_0x29e68f['result'][_0x4ffd('bb','^uIH')]['quota']+'\x20'+_0x29e68f['result'][_0x4ffd('bc','g@Vb')][_0x4ffd('bd','g@Vb')]);}}else{console['log'](_0x29e68f[_0x4ffd('be','2wJq')]['toast']);}}}catch(_0x1bb51b){$[_0x4ffd('bf','vRA6')](_0x1bb51b);}finally{_0x5f432a();}});});}function taskUrl(_0xe75e6d,_0x2fa52e){var _0x22a106={'IJfBn':'api.m.jd.com','KKXOo':'keep-alive','dSLnm':'application/json','SJOrq':_0x4ffd('c0','lW3b'),'JFOrC':_0x4ffd('c1','$e@v'),'Opkfc':_0x4ffd('c2','x]CT')};return{'url':_0x4ffd('c3','KqLV')+_0xe75e6d+_0x4ffd('c4','v7tE')+encodeURIComponent(_0x2fa52e),'headers':{'Host':_0x22a106['IJfBn'],'Origin':_0x4ffd('c5','Q*CP'),'Cookie':cookie,'Connection':_0x22a106[_0x4ffd('c6','x]CT')],'Accept':_0x22a106[_0x4ffd('c7','ly5G')],'User-Agent':_0x22a106[_0x4ffd('c8','x]CT')],'Accept-Language':_0x22a106[_0x4ffd('c9','xXqC')],'Accept-Encoding':_0x22a106[_0x4ffd('ca','aZ$R')],'Referer':_0x4ffd('cb','x]CT')}};}function TotalBean(){var _0x14d80b={'RNGno':_0x4ffd('cc','Qh&r'),'GKEDR':function(_0x4db309){return _0x4db309();},'ngHzr':_0x4ffd('cd','OcET'),'OhMaW':_0x4ffd('ce','2(5z'),'aSaTT':_0x4ffd('cf','g@Vb'),'wRbRc':_0x4ffd('d0','aL#2'),'vOBQl':_0x4ffd('d1','H!sL')};return new Promise(async _0x12d8ca=>{const _0xe7d715={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain,\x20*/*','Content-Type':_0x14d80b[_0x4ffd('d2','Kk[2')],'Accept-Encoding':_0x14d80b['OhMaW'],'Accept-Language':'zh-cn','Connection':_0x14d80b['aSaTT'],'Cookie':cookie,'Referer':_0x4ffd('d3','Q*CP'),'User-Agent':$[_0x4ffd('d4','v7tE')]()?process['env'][_0x4ffd('d5','3XvN')]?process[_0x4ffd('d6','Qh&r')][_0x4ffd('d7','wk8i')]:require(_0x4ffd('d8','g@Vb'))[_0x4ffd('d9','g@Vb')]:$[_0x4ffd('da','v7tE')](_0x14d80b[_0x4ffd('db','c)%[')])?$[_0x4ffd('dc','ly5G')](_0x4ffd('dd','xXqC')):_0x14d80b[_0x4ffd('de','3XvN')]}};$['post'](_0xe7d715,(_0x126e0f,_0x1708fd,_0x40b69f)=>{try{if(_0x126e0f){console[_0x4ffd('df',')HlX')](''+JSON[_0x4ffd('e0','2wJq')](_0x126e0f));console['log']($['name']+_0x4ffd('e1','eBiI'));}else{if(_0x40b69f){_0x40b69f=JSON['parse'](_0x40b69f);if(_0x40b69f[_0x14d80b[_0x4ffd('e2','QNZG')]]===0xd){$[_0x4ffd('e3','$e@v')]=![];return;}$['nickName']=_0x40b69f['base'][_0x4ffd('e4','2wJq')];}else{console[_0x4ffd('98','KqLV')](_0x4ffd('e5','NO&#'));}}}catch(_0x163ace){$[_0x4ffd('e6','vnuk')](_0x163ace,_0x1708fd);}finally{_0x14d80b[_0x4ffd('e7','^sqj')](_0x12d8ca);}});});}function jsonParse(_0x220b3b){var _0x12788d={'hRiOF':_0x4ffd('e8','NO&#'),'jpbcj':_0x4ffd('e9','QNZG')};if(typeof _0x220b3b==_0x12788d['hRiOF']){try{return JSON['parse'](_0x220b3b);}catch(_0x34ccda){console[_0x4ffd('a5','2wJq')](_0x34ccda);$[_0x4ffd('ea','7Ww5')]($['name'],'',_0x12788d[_0x4ffd('eb','AB[F')]);return[];}}};_0xodH='jsjiami.com.v6';
// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, o) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let o = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); o = o ? 1 * o : 20, o = e && e.timeout ? e.timeout : o; const [r, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: o }, headers: { "X-Key": r, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), o = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, o) : i ? this.fs.writeFileSync(e, o) : this.fs.writeFileSync(t, o) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let o = t; for (const t of i) if (o = Object(o)[t], void 0 === o) return s; return o } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), o = s ? this.getval(s) : ""; if (o) try { const t = JSON.parse(o); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, o] = /^@(.*?)\.(.*?)$/.exec(e), r = this.getval(i), h = i ? "null" === r ? null : r || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, o, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const r = {}; this.lodash_set(r, o, t), s = this.setval(JSON.stringify(r), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }) : this.isQuanX() ? $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: o, body: r } = t; e(null, { status: s, statusCode: i, headers: o, body: r }, r) }, t => e(t)) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: o, body: r } = t; e(null, { status: s, statusCode: i, headers: o, body: r }, r) }, t => e(t))) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: o, body: r } = t; e(null, { status: s, statusCode: i, headers: o, body: r }, r) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: o, body: r } = t; e(null, { status: s, statusCode: i, headers: o, body: r }, r) }, t => e(t)) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", o) { const r = t => { if (!t || !this.isLoon() && this.isSurge()) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, r(o)) : this.isQuanX() && $notify(e, s, i, r(o))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }