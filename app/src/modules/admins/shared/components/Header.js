import React, { useContext, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Input, Text, theme } from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../../../../shared/constants/Theme';
import { UserContext } from '../../../../root/store';
import { StudentsContext, DocumentsContext } from '../../root/store';
import { documentPicker } from '../../../../shared/utils';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({ isWhite, style, navigation, redirect }) => {
  const [currentUser, setUser] = useContext(UserContext)

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate(redirect, { product: navigation.state.params.product })}>
      <Icon
        family="GalioExtra"
        size={16}
        name="chat-33"
        color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
      />
    </TouchableOpacity>
  );
}

const AddRedirectButton = ({ family, name, redirect, isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate(redirect)}>
    <Icon
      family={family}
      size={16}
      name={name}
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const AddIcon = ({ family, name, isWhite }) => (
  <Icon
    family={family}
    size={16}
    name={name}
    color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
  />
);

const BasketButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="basket-simple"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const SearchButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      size={16}
      family={"entypo"}
      name="magnifying-glass"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const Header = props => {
  const [students, dispatchStudents] = useContext(StudentsContext)
  const [documents, dispatchDocuments] = useContext(DocumentsContext)
  
  handleLeftPress = () => {
    const { back, navigation } = props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  renderRight = () => {
    const { white, title, navigation } = props;
    const { routeName } = navigation.state;

    if (title === '') {
      return [
        <BasketButton key='basket-title' navigation={navigation} isWhite={white} />
      ]
    }

    switch (routeName) {
      case 'Courses':
        return ([
          <AddRedirectButton family='Entypo' name='plus' redirect='AddCourse' navigation={navigation} isWhite={white} />,
        ]);
      case 'ViewCourse':
          return ([
            <ChatButton key='chat-search' navigation={navigation} isWhite={white} redirect={'CourseChat'} />,
          ]);
      case 'Product':
        return ([
          <SearchButton key='search-product' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-product' navigation={navigation} isWhite={white} />
        ]);
      case 'Settings':
        return ([
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }

  renderSearch = () => {
    const { title } = props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Search ..."
        onChangeText={value => {
          if(title == 'Students' || title == 'AddStudent' ) dispatchStudents({ type: 'setSearch', search: value.toLowerCase()  })
          if(title == 'Documents') dispatchDocuments({ type: 'setSearch', search: value.toLowerCase()  })
          
        }}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />}
      />
    )
  }

  renderTabs = () => {
    const { navigation, tabTitleLeft, tabTitleRight } = props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleLeft || 'Categories'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleRight || 'Best Deals'}</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderHeader = () => {
    const { search, tabs } = props;
    if (search || tabs) {
      return (
        <Block center>
          {search ? renderSearch() : null}
          {tabs ? renderTabs() : null}
        </Block>
      )
    }
    return null;
  }

  const { back, title, white, transparent, navigation } = props;
  const { routeName } = navigation.state;
  const noShadow = ["Search", "Categories", "Deals", "Pro", "Profile"].includes(routeName);
  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
  ];

  return (
    <Block style={headerStyles}>
      <NavBar
        back={back}
        title={title}
        style={styles.navbar}
        transparent={transparent}
        right={renderRight()}
        rightStyle={{ alignItems: 'center' }}
        leftStyle={{ flex: 0.3, paddingTop: 2 }}
        leftIconFamily="AntDesign"
        leftIconName="left"
        leftIconColor={materialTheme.COLORS.PRIMARY}
        titleStyle={[
          styles.title,
          { color: theme.COLORS[white ? 'WHITE' : 'ICON'] },
        ]}
        onLeftPress={handleLeftPress}
      />
      {renderHeader()}
    </Block>
  );
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
})