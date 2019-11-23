#chat-space設定
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :posts
- has_many :comments
## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|name|null: false|
||name|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- has_many :comments
- has_many :posts_tags
- has_many  :tags,  through:  :posts_tags
## messageテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|string|null: false|
|user_id|integer|null: false|
|group_id|integer|null: false|
### Association
- has_many :posts_tags
- has_many  :posts,  through:  :posts_tags
## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user