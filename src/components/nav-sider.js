const { Menu, Submenu, MenuItem } = window.ElementUI;
/**
 * 导航栏组件
 * @param  {[type]}
 * @param  {Function}
 * @param  {[type]}                                                                      createElement('template', {              'slot': 'title'            }, menu.name + props.index)          ].concat(getChildren(menu.children, props.index)));        }        return createElement(MenuItem, {          props        }, menu.name + props.index);      } [description]
 * @return {[type]}
 */
const NavSider = Vue.component('nav-sider', {
  functional: true,
  props: ['menus'],
  render: function (createElement, context) {
    const menus = context.props.menus;

    function getChildren(menus, index = 1) {
      return menus.map((menu, i) => {
        const props = {
          index: `${index}-${i}`
        };

        if (menu.children) {
          return createElement(Submenu, {
            props
          }, [
            createElement('template', {
              'slot': 'title'
            }, menu.name + props.index)
          ].concat(getChildren(menu.children, props.index)));
        }

        return createElement(MenuItem, {
          props
        }, menu.name + props.index);
      })
    }

    return createElement(
      Menu,
      {
        props: { mode: 'horizontal' }
      },
      getChildren(menus)
    )
  }
});

export default {
  NavSider
};
