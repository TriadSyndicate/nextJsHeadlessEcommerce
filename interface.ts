import { ReactNode } from "react";

export interface ProductInterface {
  quantity: ReactNode;
    _createdAt: string, _id: string, _rev: string, _type: string, _updatedAt: string, details: string, image: {
        _key: string;
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        }
    }[], name: string, price: number, slug: {
        _type: string;
        current: string;
    }
}

export interface BannerInterface {
    _createdAt: string, _id: string, _rev: string, _type: string, _updatedAt: string,
    buttonText: string,
    desc: string,
    discount: string,
    image: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        };
    },
    largeText1: string,
    largeText2: string,
    midText: string,
    product: string,
    saleTime: string,
    smallText: string,
}

