import { SearchDetailCategoriesProps, SearchDetailCategory, SearchDetailCategoryDeepth } from '@/models/views/search/SearchDetailModel'
import { TreeNode } from 'primevue/tree'
import { onMounted, ref } from 'vue'

export const useSearchDetailedCategory = (props: SearchDetailCategoriesProps) => {
  const initValue = () => {
    const convertedArray: SearchDetailCategory[] = []

    if (!props.searchFilterInfo?.categoryList) {
      return convertedArray
    }

    props.searchFilterInfo.categoryList.forEach((category) => {
      let existingCategoryDepth1 = convertedArray.find((c) => c.key === category.displayCategoryIdDepth1)

      if (!existingCategoryDepth1) {
        existingCategoryDepth1 = {
          key: category.displayCategoryIdDepth1,
          label: category.displayCategoryNameDepth1,
          value: category.displayCategoryIdDepth1,
          count: category.count,
          level: SearchDetailCategoryDeepth.DEPTH1,
          children: []
        }
        convertedArray.push(existingCategoryDepth1)
      } else {
        existingCategoryDepth1.count! += category.count
      }

      let existingCategoryDepth2 = existingCategoryDepth1.children?.find((c) => c.key === category.displayCategoryIdDepth2)

      if (!existingCategoryDepth2) {
        existingCategoryDepth2 = {
          key: category.displayCategoryIdDepth2,
          label: category.displayCategoryNameDepth2,
          value: category.displayCategoryIdDepth2,
          level: SearchDetailCategoryDeepth.DEPTH2,
          children: []
        }
        existingCategoryDepth1.children?.push(existingCategoryDepth2)
      }

      // Add category depth 3
      existingCategoryDepth2.children?.push({
        key: category.displayCategoryIdDepth3,
        label: category.displayCategoryNameDepth3,
        level: SearchDetailCategoryDeepth.DEPTH3,
        value: category.displayCategoryIdDepth3
      })
    })

    return convertedArray.map((category, index) => {
      category.index = index
      category.children?.forEach((childrenDepth1) => {
        childrenDepth1.index = index
        childrenDepth1.children?.forEach((childrenDepth2) => {
          childrenDepth2.index = index
        })
      })
      return category
    })
  }

  const selectedCategory = ref()
  const expandedKeys = ref({})
  const categories = ref<SearchDetailCategory[]>(initValue())

  onMounted(() => {
    initExpandAndSelected()
  })

  const initExpandAndSelected = () => {
    //set selectedKey
    selectedCategory.value = props.currentCategories?.reduce((acc: Object, key: string) => {
      ;(acc as any)[key!] = true
      return acc
    }, {})

    //set expandedKeys
    props.currentCategories?.forEach((key) => {
      const listParent: string[] = []
      categories.value.forEach((category) => {
        if (category.children) {
          category.children.forEach((childrenDepth1) => {
            if (childrenDepth1.children) {
              if (childrenDepth1.key === key) {
                listParent.push(category.key)
              }
              childrenDepth1.children.forEach((childrenDepth2) => {
                if (childrenDepth2.key === key) {
                  listParent.push(category.key)
                  listParent.push(childrenDepth1.key)
                }
              })
            }
          })
        }
      })
      listParent.forEach((key) => {
        ;(expandedKeys.value as any)[key] = true
      })
    })
  }

  const handleRemoveSelected = (key?: string) => {
    if (key) {
      delete selectedCategory.value[key]
    } else {
      selectedCategory.value = {}
    }
  }

  const isDisplayIconClose = (key: string) => {
    try {
      return selectedCategory.value[key]
    } catch (e) {
      return false
    }
  }

  const getAllCategoryKeyByIndex = (index: number, categories: SearchDetailCategory[]): string[] => {
    const keys: string[] = []
    categories.forEach((category) => {
      if (category.index === index) {
        keys.push(category.key)
      }
      if (category.children) {
        keys.push(...getAllCategoryKeyByIndex(index, category.children))
      }
    })
    return keys
  }

  const selectedNode = (node: TreeNode) => {
    if (!selectedCategory.value) {
      selectedCategory.value = {}
    }
    selectedCategory.value[node.key!] = true
    const keys = getAllCategoryKeyByIndex(node.index, categories.value)
    keys.forEach((key) => {
      if (key !== node.key) {
        delete selectedCategory.value[key]
      }
    })
  }

  const expandNode = (node: TreeNode) => {
    if (expandedKeys.value && node.children && node.children.length) {
      ;(expandedKeys.value as any)[node.key!] = true
    }
  }

  const closeExpandNode = (node: TreeNode) => {
    if (expandedKeys.value && node.children && node.children.length) {
      ;(expandedKeys.value as any)[node.key!] = false
    }
    
    //close all children
    if (node.children) {
      node.children.forEach((child) => {
        closeExpandNode(child)
      })
    }
  }

  /* Find label of category by category key */
  const findLabelByKey = (categories: SearchDetailCategory[], key: string): string => {
    for (const category of categories) {
      if (category.key === key) {
        return category.label
      }
      if (category.children) {
        const label = findLabelByKey(category.children, key)
        if (label) {
          return label
        }
      }
    }
    return ''
  }

  return {
    selectedCategory,
    expandedKeys,
    categories,
    handleRemoveSelected,
    isDisplayIconClose,
    selectedNode,
    expandNode,
    closeExpandNode,
    findLabelByKey
  }
}
