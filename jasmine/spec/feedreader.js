/* 把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        allFeeds.forEach(function(item){
            // it 放在循环内部，出错时就能定位是哪一个 url 出现问题了
            it('所有的源保证有链接字段',function(){
                expect(item.url).toBeTruthy();
                expect(item.url).toContain("http");
            });
         });

        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        allFeeds.forEach(function(item){
            it('所有的源保证有名字字段',function(){
                expect(item.name).toBeDefined();
                expect(item.name.length).toBeGreaterThan(2);
            });
         });

    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */
    describe('The menu',function () {
        /* TODO:
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
        it('菜单元素默认是隐藏',function(){
            var hidden=$('body').hasClass('menu-hidden');
            expect(hidden).toBe(true);
        });

         /* TODO:
          * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
          * 测试应该包含两个 expectation ：当点击图标的时候菜单是否显示，
          * 再次点击的时候是否隐藏。
          */
        it('汉堡标记可以切换菜单的可见状态',function(){
            var menuIcon=$('.menu-icon-link');

            //当点击图标的时候菜单是否显示
            menuIcon.trigger('click');
            var hidden=$('body').hasClass('menu-hidden');//
            expect(hidden).toBe(false);

            //再次点击的时候是否隐藏
            menuIcon.trigger('click');
            hidden=$('body').hasClass('menu-hidden');
            expect(hidden).toBe(true);
        });
    });

    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
    describe('Initial Entries',function(){
        /* TODO:
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素里面至少有一个 .entry 的元素。
         */
        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });
        });

        it('.feed容器元素里面至少有一个.entry 的元素',function(done){
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
    describe('New Feed Selection',function(){
        /* TODO:
         * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         */
        var initialHtml,
            newHtml,
            originalTimeout;

        //修改默认超时间距为20秒，
        //（指从异步函数开始请求至spec执行完的这段时间）
        //让异步函数和spec拥有充足的执行时间
        //要在beforeEach外，设置jasmine.DEFAULT_TIMEOUT_INTERVAL
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

        //spec测试完恢复默认
        afterEach(function() {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

        //获取加载不同源时发生改变的元素
        beforeEach(function(done){
            loadFeed(0,function(){
                initialHtml=$('.feed').html();

                loadFeed(1,function(){
                    newHtml=$('.feed').html();
                    //done()通知spec（it）执行测试
                    done();
                });
            });
        });

        //函数参数done告诉spec要等待异步函数执行完毕，
        //才能开始执行测试
        it('内容会改变',function(done){
            expect(initialHtml).not.toEqual(newHtml);

            //header-title类的元素的文本内容发生改变
            var titleChange = $('.header-title').text()!==allFeeds[0].name;
            expect(titleChange).toBe(true);
            //done()意味测试完成
            done();
        });
    });
}());
