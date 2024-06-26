import { LikesRepository } from "@/entities/like";
import { PostsRepository } from "@/entities/post";
import { PostNotExistError } from "../errors/post-not-exist-error";

type CreateLikeInPostUseCaseRequest = {
  postId: number;
  userId: string;
};

export class CreateLikeInPostUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private postsRepository: PostsRepository
  ) { }

  async execute({ postId, userId }: CreateLikeInPostUseCaseRequest) {
    const postById = await this.postsRepository.findById(postId);

    if (!postById) {
      throw new PostNotExistError();
    }

    const checkIfTheUserHasAlreadyLikedThePost =
      await this.likesRepository.findByUserIdAndPostId({ postId, userId });

    if (checkIfTheUserHasAlreadyLikedThePost) {
      await this.likesRepository.removeLike(
        checkIfTheUserHasAlreadyLikedThePost.id
      );

      return { like: false };
    }

    await this.likesRepository.create({
      postId,
      userId,
    });

    return { like: true };
  }
}
