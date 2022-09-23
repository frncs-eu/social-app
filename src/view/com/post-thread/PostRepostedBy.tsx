import React, {useState, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  RepostedByViewModel,
  RepostedByViewItemModel,
} from '../../../state/models/reposted-by-view'
import {Link} from '../util/Link'
import {useStores} from '../../../state'
import {s, colors} from '../../lib/styles'
import {AVIS} from '../../lib/assets'

export const PostRepostedBy = observer(function PostRepostedBy({
  uri,
}: {
  uri: string
}) {
  const store = useStores()
  const [view, setView] = useState<RepostedByViewModel | undefined>()

  useEffect(() => {
    if (view?.params.uri === uri) {
      console.log('Reposted by doing nothing')
      return // no change needed? or trigger refresh?
    }
    console.log('Fetching Reposted by', uri)
    const newView = new RepostedByViewModel(store, {uri})
    setView(newView)
    newView
      .setup()
      .catch(err => console.error('Failed to fetch reposted by', err))
  }, [uri, view?.params.uri, store])

  // loading
  // =
  if (
    !view ||
    (view.isLoading && !view.isRefreshing) ||
    view.params.uri !== uri
  ) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  // error
  // =
  if (view.hasError) {
    return (
      <View>
        <Text>{view.error}</Text>
      </View>
    )
  }

  // loaded
  // =
  const renderItem = ({item}: {item: RepostedByViewItemModel}) => (
    <RepostedByItem item={item} />
  )
  return (
    <View>
      <FlatList
        data={view.repostedBy}
        keyExtractor={item => item._reactKey}
        renderItem={renderItem}
      />
    </View>
  )
})

const RepostedByItem = ({item}: {item: RepostedByViewItemModel}) => {
  return (
    <Link style={styles.outer} href={`/profile/${item.name}`} title={item.name}>
      <View style={styles.layout}>
        <View style={styles.layoutAvi}>
          <Image
            style={styles.avi}
            source={AVIS[item.name] || AVIS['alice.test']}
          />
        </View>
        <View style={styles.layoutContent}>
          <Text style={[s.f15, s.bold]}>{item.displayName}</Text>
          <Text style={[s.f14, s.gray5]}>@{item.name}</Text>
        </View>
      </View>
    </Link>
  )
}

const styles = StyleSheet.create({
  outer: {
    marginTop: 1,
    backgroundColor: colors.white,
  },
  layout: {
    flexDirection: 'row',
  },
  layoutAvi: {
    width: 60,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  avi: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  layoutContent: {
    flex: 1,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
})
