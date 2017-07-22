# React VR feat React InstantSearch by Algolia

This experimentation had search to a [React VR](https://facebook.github.io/react-vr/) application using [React InstantSearch](https://community.algolia.com/react-instantsearch) by Algolia and 
[Annyang](https://github.com/TalAter/annyang) for the speech-to-text part. 

## Context

The goal is to use Algolia through React InstantSearch to bring search to a React VR app. The user 
will search into the app by speaking. 

Let's see how we can turn the Algolia [tourism](https://community.algolia.com/react-instantsearch/examples/tourism/) demo into a VR experience. 

### Start the demo

```sh
yarn
yarn start
```

Then go to `http://localhost:8081/vr`

### Playing with the demo

This demo uses speech-to-text to perform the search. Try those commands: 

* `I want to go to Rome`

or maybe Paris, Sydney or San Francisco? 

* `We are six guests`

or maybe two, three or six? 

* `For a price between 100 and 200`

### Credits

* This example was made possible thanks to [https://github.com/Tr4in/ReactVRSpeechRecognition](https://github.com/Tr4in/ReactVRSpeechRecognition)
* Dataset from [airbnb.com](airbnb.com)
* Pictures from [Sydney](https://www.flickr.com/photos/gawthrop/2189528022/in/photolist-5aXtG5-58y5EW-ehsmyi-4ktP7N-4r4KDj-4r4LTs-bUQyw-4kpNvn-4kqRZ4-4kq7q2-4kuRWm-4m8CJc-4kpYAc-4ktUp9-4kq4np-4kq5UT-4kq1cx-4ktZp7-4ktVZb-4kq32Z-4m8DHH-4ktXEA-4mcH9y-KKVpKk-KKViCa), [Paris](https://www.flickr.com/photos/rueike/8495325676/in/photolist-dWGLmm-oFqDvx-mAcR3h-nfNghV-ea38Gk-tywTU-Gj578-6XjXXU-A485t-Ln2hM-GopNU-6UDoeb-BCnoT-7HfBrq-6WXNMn-zELQJ-64H6CN-rYysY-6TJGWX-7CZi2A-oEsrSH-Agkkg-bExmww-zEC6X-3dZG2i-8jfjLe-FezkM-6rBG7x-3LbYCF-6ZU9EZ-BCnoM-MCFdN-6xxD1R-4Bw5wy-DgWyi-CPM2Yp-Gw6ar-tRhJa-5UZy91-Dg735Q-4qH7aN-2zf5qW-5V4qA7-6UwCPA-AUToS-t1Vxm-Dh2Q1-N3UtH-3qjVfw-CdiTb), [San Francisco](https://www.flickr.com/photos/54144402@N03/12639701225/in/photolist-kfVLPc-keLDPc-VeKyic-5wAakJ-UteBJC-4heGvv-UE6sCr-UwMtYq-TWR6mw-TpqLEm-Uxmf4f-GED8m4-TNqco4-oMpnzC-or3BrQ-8fvuH4-BkHJy-o9xhdc-oPayVz-opJkkw-otf6ze-BkHTc-2qGfr8-pnf6k-ow6foc-dDS9MB-9nMxHG-UzNL3z-gxzCVN-5qW3zr-oaNyXa-ov81mH-oazDu1-bcJNcx-pnfsH-8fhS4v-ovibCW-ofDawk-4WyHHm-oEvc69-dMWhxJ-8cGePJ-9eKLsz-g7LnPa-ojm5Nq-84Sikf-5wuHRv-GYXc3-ocgwwt-g7Kg8N), [Krabi](https://www.flickr.com/photos/sitoo/32252838043/in/photolist-R95e5x-GitVHN-ShaJ5y-9GpWuE-wCfog-oazCVG-oxbEGC-5nfUgB-vixsY-J1qsLo-oDZ7GL-JcUyoy-nTuf7y-oLJg88-nVeAEx-ReGBRT-dHcHj5-r4dn7d-fm8JF9-vizbH-viz2U-pX2kPU-JgtXU7-fg4cV7-J8toJr-c1pC3Y-fvbbcd-oFdoGU-Hx5Sxe-nTegjf-HEUMHB-vixuG-wwUR57-68W7Z7-eMmKSA-pgAQws-qE7gzF-RT9X1t-pxhaSB-GxuuhL-p2dK4X-WRH7Ev-odt4yN-oWiGSx-pNr5oK-VzvJ8w-pwkVVs-pq3sgh-VC4JFD-HubXyR), [California](https://www.flickr.com/photos/54144402@N03/34485312836/in/photolist-Uxmf4f-PDm9UQ-9pLq1J-N5itsv-WqNVi7-9rhgvY-oqnucP-FNn5CQ-5nRwGn-KJ6Rv-p2dK4X-KAr9hr-UYzekd-kFfa2X-FwrcJA-9fphLZ-9H1QV-9zUNYg-bWiVjD-vopYX-KHVLf-cX1gTN-dqx2kz-GJnRk-okzfGs-KJ5kp-omjRPB-VU3LHD-rphCTN-azhUiT-625BNo-oxJa7u-9sDHvR-Jk7UkG-zxYiv-Mhk2VF-Ls3dRH-7eQHCv-5n7mXF-eZCTSi-5Uxsun-625Bjw-LrXgUy-r4UF9-KHUQS-4CuFdL-625BAA-KHUm9-EMfTJ3-ansdvD) and [Rome](https://www.flickr.com/photos/gadl/4137159485/in/photolist-7iA2nX-762Qk1-bq2eTP-74aubJ-cExsBC-SRzHwS-76coYM-6WquPw-75u2iK-MYgTq-6WHU8Z-75MWVG-6Wx5EX-71w9eL-6YLEkJ-6YSTv9-4PXd9Z-6XCF4K-7imtTS-6VGfWi-7fQ9fk-7iWQPM-75FRh7-71N825-9sRfan-VuSReJ-79MQ36-7j9Abq-4qB2Cn-75u2in-6Vs3r3-6Vs3r9-75FRfU-7iWQMe-5WR4F6-8iMoTx-6WquK7-7j9Ab7-6XGHHQ-71w9ed-71mF4f-6YSTuY-7cVsFm-71mF3A-6XZPwn-7imtTy-JwfLMb-NKCEPt-K2x7Rq-7d4NVo). 
