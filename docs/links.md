---
title: Links
icon: link
sidebar: false
article: false
---

## 一些很酷的博客
<MyLink :links="friends"/>

## 一些好用的网站
<MyLink :links="design"/>

## 一些常用的工具
<MyLink :links="tools"/>

## 一些应读的文档
<MyLink :links="documents"/>

<script setup lang="ts">
import MyLink from "@MyLink";
import {design ,tools} from "@Design";
import {friends} from "@BlogLinks";
import {documents} from "@DocLinks";
</script>