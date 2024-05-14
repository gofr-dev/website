# **Contributing Guidelines** 📄

This documentation contains a set of guidelines to help you during the contribution process.
We are happy to welcome all the contributions from anyone willing to improve/add new scripts to this project.
Thank you for helping out and remember, **no contribution is too small.**
<br>
Please note we have a [code of conduct](CODE_OF_CONDUCT.md)  please follow it in all your interactions with the project.



<br>

## **Need some help regarding the basics?🤔**


You can refer to the following articles on basics of Git and Github and also contact the Project Mentors,
in case you are stuck:

- [Forking a Repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
- [Cloning a Repo](https://help.github.com/en/desktop/contributing-to-projects/creating-an-issue-or-pull-request)
- [How to create a Pull Request](https://opensource.com/article/19/7/create-pull-request-github)
- [Getting started with Git and GitHub](https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6)
- [Learn GitHub from Scratch](https://docs.github.com/en/get-started/start-your-journey/git-and-github-learning-resources)

<br>

## **Issue Report Process 📌**

1. Go to the project's issues.
2. Give proper description for the issues.
3. Don't spam to get the assignment of the issue 😀.
4. Wait for till someone is looking into it !.
5. Start working on issue only after you got assigned that issue 🚀.

<br>

## Contribution Guidelines
* Minor changes can be done directly by editing code on github. Github automatically creates a temporary branch and
  files a PR. This is only suitable for really small changes like: spelling fixes, variable name changes or error string
  change etc. For larger commits, following steps are recommended.
* (Optional) If you want to discuss your implementation with the users of Gofr, use the github discussions of this repo.
* Configure your editor to use goimport and golangci-lint on file changes. Any code which is not formatted using these
  tools, will fail on the pipeline.
* All code contributions should have associated tests and all new line additions should be covered in those testcases.
  No PR should ever decrease the overall code coverage.
* Once your code changes are done along with the testcases, submit a PR to development branch. Please note that all PRs
  are merged from feature branches to development first.
* All PRs need to be reviewed by at least 2 Gofr developers. They might reach out to you for any clarfication.
* Thank you for your contribution. :)

### GoFr Testing Policy:

Testing is a crucial aspect of software development, and adherence to these guidelines ensures the stability, reliability, and maintainability of the GoFr codebase.

### Guidelines

1.  **Test Types:**

    -   Write unit tests for every new function or method.
    -   Include integration tests for any major feature added.


2. **Test Coverage:**

-   No new code should decrease the existing code coverage for the packages and files.
> The `code-climate` coverage check will not pass if there is any decrease in the test-coverage before and after any new PR is submitted.



3. **Naming Conventions:**

-   Prefix unit test functions with `Test`.
-   Use clear and descriptive names.
```go
func TestFunctionName(t *testing.T) { 
// Test logic 
}
```

## **Pull Request Process 🚀**

1. Ensure that you have self reviewed your code 😀
2. Make sure you have added the proper description for the functionality of the code
3. I have commented my code, particularly in hard-to-understand areas.
4. Add screenshot it help in review.
5. Submit your PR by giving the necesarry information in PR template and hang tight we will review it really soon 🚀

<br>

# **Thank you for contributing💗** 
