class Project < ApplicationRecord
  belongs_to :user
  has_many :tasks, dependent: :destroy

  def author(user)
    self.project_users.where(user: user)
  end
end
