import urllib
from collections import namedtuple
from flask_restful import Resource, reqparse
from flask import request, jsonify, make_response
import json

from hqlf.model.image3d import Image3D as Image3DModel
from hqlf.restfulapi.utils import path_unquote


class ImageBuffer:

    buffer = []
    buffer_size = 10

    def get_image(self, path):
        Element = namedtuple('Element', ['path', 'image3d'])
        for x in self.buffer:
            if x.path == path:
                return x.image3d
        if len(self.buffer) >= self.buffer_size:
            self.buffer.pop([range(len(self.buffer) - self.buffer_size + 1)])
        el = Element(path, Image3DModel(path))
        self.buffer.append(el)
        return el.image3d


image_buffer = ImageBuffer()

_parser = reqparse.RequestParser()
_parser.add_argument('type', type=str)
_parser.add_argument('ids', type=int)
_parser.add_argument('axis', type=int)
_parser.add_argument('idx', type=int)
_parser.add_argument('idy', type=int)
_parser.add_argument('idz', type=int)


class Image3D(Resource):
    def get(self, path):
        path = path_unquote(path)
        args = _parser.parse_args()
        req_type = args.get('type', 'head')
        if req_type == 'head':
            return image_buffer.get_image(path).head(), 200
        elif req_type == 'view':
            kwargs = {
                'id_slice': args.get('ids', 0),
                'axis': args.get('axis', 0),
            }
            image = image_buffer.get_image(path)
            return image.imshow(**kwargs), 200
        elif req_type == 'view3':
            id_slice = [args.get('idx', 0), args.get(
                'idy', 0), args.get('idz', 0)]
            return image_buffer.get_image(path).imshow3(id_slice)
