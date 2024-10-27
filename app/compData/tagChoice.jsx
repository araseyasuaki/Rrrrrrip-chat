// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { useRecoilState } from 'recoil';
// import { userState } from '../recoil';

// const TagChoice = () => {
//   const [tags, setTags] = useRecoilState(userState);

//   const tagChangeBtn = (tagId) => {
//     const tagChecker = tags.tagList.map(tag =>
//       tag.id === tagId ? { ...tag, selected: !tag.selected } : tag
//     );

//     setTags(prev => ({...prev,
//       tagList: tagChecker,
//     }));
//     setTags(prev => ({...prev,
//       tagsId: tags.tagList.filter(tag => tag.selected === true).map(tag => tag.id)
//     }));
//     console.log(tags.tagsId)
//   };

//   return (
//     <View style={s.container}>
//       {tags.tagList.map(tag => (
//         <TouchableOpacity
//           key={tag.id}
//           style={[s.tagButton, tag.selected && s.tagButtonOn]}
//           onPress={() => tagChangeBtn(tag.id)}
//         >
//           <Image source={tag.imgUrl} style={s.tagImage} />
//           <Text style={s.tagText}>{tag.name}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const s = StyleSheet.create({
//   container: {
//     width: '100%',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   tagButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 20,
//     padding: 6,
//     paddingHorizontal: 8,
//     borderWidth: 1,
//     borderColor: '#000',
//     margin: 5,
//   },
//   tagButtonOn: {
//     backgroundColor: '#000',
//   },
//   tagImage: {
//     width: 20,
//     height: 20,
//   },
//   tagText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginLeft: 6,
//   },
// });

// export default TagChoice;



import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil';

const TagChoice = () => {
  const [tags, setTags] = useRecoilState(userState);

  const tagChangeBtn = (tagId) => {
    const updatedTagList = tags.tagList.map(tag =>
      tag.id === tagId ? { ...tag, selected: !tag.selected } : tag
    );

    const updatedTagsId = updatedTagList
      .filter(tag => tag.selected === true)
      .map(tag => tag.id);

    setTags(prev => ({
      ...prev,
      tagList: updatedTagList,
      tagsId: updatedTagsId
    }));
  };

  return (
    <View style={s.container}>
      {tags.tagList.map(tag => (
        <TouchableOpacity
          key={tag.id}
          style={[s.tagButton, tag.selected && s.tagButtonOn]}
          onPress={() => tagChangeBtn(tag.id)}
        >
          <Image source={tag.imgUrl} style={s.tagImage} />
          <Text style={s.tagText}>{tag.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
  },
  tagButtonOn: {
    backgroundColor: '#000',
  },
  tagImage: {
    width: 20,
    height: 20,
  },
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 6,
  },
});

export default TagChoice;
