import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o,c as l,a as e,b as i,e as r,f as s}from"./app-421df5e1.js";const h="/YanZJNNFF_Blog/assets/image/computer-science/networking/006/HTTP.png",p="/YanZJNNFF_Blog/assets/image/computer-science/networking/006/HTTPS.png",c="/YanZJNNFF_Blog/assets/image/computer-science/networking/006/mid-attack.png",g="/YanZJNNFF_Blog/assets/image/computer-science/networking/006/https-flow.png",d={},T=s('<h2 id="http-和-https" tabindex="-1"><a class="header-anchor" href="#http-和-https" aria-hidden="true">#</a> HTTP 和 HTTPS</h2><h3 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别</h3><ul><li>HTTP 是明文传输，不安全，而 HTTPS 加入了 SSL/TLS 安全协议，使得报文能加密传输；</li><li>HTTP 建立连接只需 TCP 三次握手，而 HTTPS 在三次握手后，还需要进行 SSL/TLS 握手；</li><li>HTTP 端口号为 80，HTTPS 端口号为 443；</li><li>HTTPS 需要向 CA 申请数字证书。</li></ul><figure><img src="'+h+'" alt="http" tabindex="0" loading="lazy"><figcaption>http</figcaption></figure><figure><img src="'+p+'" alt="https" tabindex="0" loading="lazy"><figcaption>https</figcaption></figure><h3 id="https-缺点" tabindex="-1"><a class="header-anchor" href="#https-缺点" aria-hidden="true">#</a> HTTPS 缺点</h3><ul><li>在相同网络环境中，HTTPS 相比 HTTP 无论是响应时间还是耗电量都有大幅度上升；</li><li>HTTPS 的安全是有范围的，在黑客攻击、服务器劫持等情况下几乎起不到作用；</li><li>在现有的证书机制下，中间人攻击依然有可能发生；</li><li>HTTPS 需要更多的服务器资源，也会导致成本的升高。</li></ul><h2 id="加密算法" tabindex="-1"><a class="header-anchor" href="#加密算法" aria-hidden="true">#</a> 加密算法</h2><p>HTTPS 使用混合加密算法解决数据安全传输问题，即<strong>对称加密</strong>和<strong>非对称加密</strong>混合使用。</p><h3 id="对称加密" tabindex="-1"><a class="header-anchor" href="#对称加密" aria-hidden="true">#</a> 对称加密</h3><p>加密和解密都是同一个密钥，优缺点如下：</p><p><strong>优点：</strong></p><ol><li>由于密钥相同，因此加密解密速度快，适合加密比较大的数据。</li></ol><p><strong>缺点：</strong></p><ol><li>交易双方在传输过程中需要使用相同的密钥，因此需要在<strong>首次</strong>传输过程中必然需要由一方将密钥传给另一方，这样就无法保证保证密钥的安全性，有可能会被截获；</li><li>不同用户访问的密钥需要不同，这会造成服务器管理密钥困难，成本高。</li></ol><h3 id="非对称加密" tabindex="-1"><a class="header-anchor" href="#非对称加密" aria-hidden="true">#</a> 非对称加密</h3><p>加密和解密使用不同的密钥：公钥（public key）加密和私钥（private key）解密。流程如下：</p><ol><li>发送方向接收方请求一个公钥；</li><li>发送方使用公钥加密，公钥和加密的数据泄露并没有关系，因为只有私钥才能解密；</li><li>接收方用私钥解密消息。</li></ol><p><strong>优点：</strong></p><ol><li>加密和解密使用不同的密钥，私钥不需要通过网络传输，安全性高。</li></ol><p><strong>缺点：</strong></p><ol><li>计算量比较大，加密解密速度比对称加密慢；</li><li>中间人攻击：中间人进行拦截，无法保证公钥是接收方提供的。</li></ol><figure><img src="'+c+'" alt="中间人攻击" tabindex="0" loading="lazy"><figcaption>中间人攻击</figcaption></figure><h2 id="数字证书和数字签名" tabindex="-1"><a class="header-anchor" href="#数字证书和数字签名" aria-hidden="true">#</a> 数字证书和数字签名</h2><p>中间人攻击使我们无法验证公钥的真假。因此引入<strong>数字证书</strong>，用它来证明身份是真实的，并且防止被中间人攻击。</p><p>由数字证书认证机构（Certificate Authority，简称CA）负责给用户签发数字证书，证书中包括：签发者、使用者公钥、使用的 HASH 算法、证书到期时间等。</p><p>但是问题来了，如果中间人篡改了证书，如何保证身份证明是有效的？这时需要引进<strong>数字签名</strong>。</p><p>首先使用 CA 自带的 HASH 算法对证书的内容进行 HASH 得到一个信息摘要，再用 CA 的私钥进行加密，最终组成数字签名。当服务器将原始信息和数字签名发送过来时，客户端先使用 CA 的公钥对数字签名进行解密，得到 CA 创建的信息摘要，再使用同样的 HASH 算法生成原始信息的信息摘要，两者进行对比，就知道证书是否被篡改了。</p><p>通过数字签名的证书验证，能最大程度的保证数据传输安全。</p><h2 id="https-工作流程" tabindex="-1"><a class="header-anchor" href="#https-工作流程" aria-hidden="true">#</a> HTTPS 工作流程</h2><p>前面提到，HTTPS 使用了混合加密解决安全传输问题，整个工作过程分为三大步：证书验证、非对称加密和对称加密。</p><figure><img src="'+g+'" alt="https工作流程" tabindex="0" loading="lazy"><figcaption>https工作流程</figcaption></figure><p><strong>证书验证：</strong></p><ol><li>Client 发起一个 HTTPS 的请求；</li><li>Server 把事先配置好的公钥证书返回给客户端；</li><li>Client 验证公钥证书：如果验证通过则继续，不通过则显示警告信息；</li></ol><p><strong>非对称加密：</strong></p><ol start="4"><li>Client 生成加密所使用的会话密钥，然后用证书的公钥加密这个会话密钥，发给 Server。</li><li>Server 使用自己的私钥解密这个消息，得到会话密钥。至此，Client 和 Server 双方都持有了相同的会话密钥。</li></ol><p><strong>对称加密：</strong></p><ol start="6"><li>Server 使用会话密钥加密“明文内容 A”，发送给 Client。</li><li>Client 使用会话密钥解密响应的密文，得到“明文内容 A”。</li><li>Client 再次发起 HTTPS 的请求，使用会话密钥加密请求的“明文内容 B”，然后 Server 使用会话密钥解密密文，得到“明文内容 B”。</li></ol><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2>',39),f={href:"https://www.cnblogs.com/linianhui/p/security-based-toolbox.html",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.cnblogs.com/linianhui/p/security-complex-toolbox.html",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.cnblogs.com/linianhui/p/security-https-workflow.html",target:"_blank",rel:"noopener noreferrer"},S={href:"https://segmentfault.com/a/1190000021494676",target:"_blank",rel:"noopener noreferrer"};function m(H,P){const t=a("ExternalLinkIcon");return o(),l("div",null,[T,e("p",null,[e("a",f,[i("[信息安全] 1.密码工具箱 "),r(t)])]),e("p",null,[e("a",u,[i("[信息安全] 2.密码工具箱（续）"),r(t)])]),e("p",null,[e("a",_,[i("[信息安全] 3.HTTPS工作流程"),r(t)])]),e("p",null,[e("a",S,[i("HTTPS 详解一：附带最精美详尽的 HTTPS 原理图"),r(t)])])])}const w=n(d,[["render",m],["__file","006-HTTPS-overview.html.vue"]]);export{w as default};
