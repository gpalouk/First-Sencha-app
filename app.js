Ext.application({
    name: 'Sencha',

    requires: [
        'Ext.MessageBox'
    ],

    views: [],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },

    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    launch: function() {
        Ext.create("Ext.tab.Panel", {
            fullscreen: true,
            tabBarPosition: 'bottom',

            items: [
                {
                    xtype: 'nestedlist',
                    title: 'Sencha Blog',
                    iconCls: 'star',
                    displayField: 'title',
                    
                    detailCard: {
                        xtype: 'panel',
                        scrollable: true,
                        styleHtmlContent: true
                    },

                    listeners: {
                        itemtap: function(nestedList, list, index, element, post) {
                            this.getDetailCard().setHtml(post.get('content'));
                        }
                    },

                    store: {
                        type: 'tree',

                        fields: [
                            'title', 'link', 'author', 'contentSnippet', 'content',
                            {name: 'leaf', defaultValue: true}
                        ],

                        root: {
                            leaf: false
                        },

                        proxy: {
                            type: 'jsonp',
                            url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
                            reader: {
                                type: 'json',
                                rootProperty: 'responseData.feed.entries'
                            }
                        }
                    }
                }
            ]
        });
    },
		   
    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
